import { AUTH, RESOURCES } from '@/constants';
import { mutations, actions } from '../auth';

const mockCreateResource = jest.fn();
const mockFindAllResources = jest.fn();
const mockDestroyResource = jest.fn();

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      createResource: mockCreateResource,
      findAllResources: mockFindAllResources,
      destroyResource: mockDestroyResource,
    };
  },
}));

describe('auth', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('mutations', () => {
    it(`${AUTH.MUTATIONS.AUTH_SUCCESS} sets auth op result`, () => {
      const state = {};
      const status = 'success';

      mutations[AUTH.MUTATIONS.AUTH_SUCCESS](state);

      expect(state.status).toBe(status);
    });

    it(`${AUTH.MUTATIONS.LOGOUT} logs user out`, () => {
      const state = {};
      const status = 'unauthorized';

      mutations[AUTH.MUTATIONS.LOGOUT](state);

      expect(state.status).toBe(status);
    });
  });

  describe('actions', () => {
    let commit;
    beforeEach(() => {
      commit = jest.fn();
      jest.resetModules();
    });
    afterEach(() => {
      commit = null;
    });

    it(`${AUTH.ACTIONS.AUTH_REQUEST} sends proper auth request`, async () => {
      const authData = {
        cookie_auth: true,
        login: 'John Dow',
        password: '123',
      };
      mockCreateResource.mockImplementation(() => ({}));

      await actions[AUTH.ACTIONS.AUTH_REQUEST]({ commit }, authData);

      expect(mockCreateResource).toHaveBeenCalledWith(RESOURCES.AUTH, authData);
      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.AUTH_SUCCESS);
    });

    it(`${AUTH.ACTIONS.LOCAL_AUTH} sends auth request to get auth status`, async () => {
      mockFindAllResources.mockReturnValue({});

      await actions[AUTH.ACTIONS.LOCAL_AUTH]({ commit });

      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.AUTH_SUCCESS);
    });

    it(`${AUTH.ACTIONS.LOGOUT} destroys session`, async () => {
      mockDestroyResource.mockReturnValue({});

      await actions[AUTH.ACTIONS.LOGOUT]({ commit });

      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.LOGOUT);
    });
  });
});
