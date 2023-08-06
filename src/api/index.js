import Api from 'devour-client';

import {
  AUTH,
  NETWORK_SERVICE, NOTIFICATION_TYPES, RELATIONSHIPS, RESOURCES, GENERAL_PATHS,
} from '../constants';

export default class JsonApi {
  static authDataReqTransformationMiddleware = {
    name: 'auth-data-transformation-req',
    req: (payload) => {
      if (payload.req.model === RESOURCES.AUTH) {
        payload.req.data = {
          auth: payload.req.data?.data.attributes,
        };
      }

      return payload;
    },
  };

  static authDataResTransformationMiddleware = {
    name: 'auth-data-transformation-res',
    res: (payload) => {
      if (payload.req.model === RESOURCES.AUTH) {
        payload.res.data = {
          data: {
            type: RESOURCES.AUTH,
            attributes: payload.res.data,
          },
        };
      }

      return payload;
    },
  };

  static originationStatsDataResTransformationMiddleware = {
    name: 'origination-stats-data-transformation-res',
    res: (payload) => {
      if (payload.req.model === RESOURCES.ORIGINATION_STATISTICS) {
        payload.res.data = {
          data: {
            type: RESOURCES.ORIGINATION_STATISTICS,
            attributes: {
              series: payload.res.data.data,
              totals: payload.res.data.totals,
            },
          },
        };
      }

      return payload;
    },
  };

  static getNetworkErrorMiddleware = (notification, storeDispatch) => ({
    name: 'error-notify',
    error: (payload) => {
      notification.open({
        type: NOTIFICATION_TYPES.ERROR,
        message: payload[0].title,
        description: payload[0].detail,
        duration: 3,
      });

      storeDispatch(NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE, false);

      return payload;
    },
  });

  static getNetworkAuthErrorMiddleware = (router, storeDispatch) => ({
    name: 'auth-redirect',
    error: async (payload) => {
      if (payload[0].title === 'Authorization failed') {
        await storeDispatch(AUTH.ACTIONS.LOGOUT);
        router.push(GENERAL_PATHS.LOG_IN);
      }

      return payload;
    },
  });

  static get apiInstance() {
    if (typeof this.jsonApiInstance === 'undefined') {
      this.jsonApiInstance = new JsonApi();
    }
    return this.jsonApiInstance;
  }

  constructor() {
    try {
      this.instance = new Api({
        apiUrl: `${YETI_CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`,
        pluralize: false,
      });
      this.instance.axios.defaults.withCredentials = true;
    } catch (e) {
      throw new Error(`Api was not initialized due to error: ${e}. Please check your config file.`);
    }

    this.initializeResources();
    this.instance.insertMiddlewareBefore('axios-request', JsonApi.authDataReqTransformationMiddleware);
    this.instance.insertMiddlewareBefore('response', JsonApi.authDataResTransformationMiddleware);
    this.instance.insertMiddlewareBefore('response', JsonApi.originationStatsDataResTransformationMiddleware);
  }

  initializeResources() {
    Object.values(RESOURCES).forEach((resource) => {
      this.addRelationship(resource);
    });
  }

  addRelationship(resource) {
    this.instance.define(resource, RELATIONSHIPS[resource]);
  }

  findAllResources(resourceName, params) { return this.instance.findAll(resourceName, params); }

  findOneResource(resourceName, id, params) { return this.instance.find(resourceName, id, params); }

  createResource(resourceName, data) { return this.instance.create(resourceName, data); }

  destroyResource(resourceName, id) { return this.instance.destroy(resourceName, id); }

  insertNetworkErrorMiddleware(notify, storeDispatch) {
    const middleware = JsonApi.getNetworkErrorMiddleware(notify, storeDispatch);
    this.instance.insertMiddlewareAfter('errors', middleware);
  }

  insertNetworkAuthErrorMiddleware(push, storeDispatch) {
    const middleware = JsonApi.getNetworkAuthErrorMiddleware(push, storeDispatch);
    this.instance.insertMiddlewareAfter('errors', middleware);
  }
}
