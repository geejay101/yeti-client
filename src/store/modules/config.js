const getters = {
  blockedPages: () => YETI_CONFIG.yeti.blockedPages,
  apiBaseUrl: () => YETI_CONFIG.yeti.apiBaseUrl,
  linkOnLogo: () => YETI_CONFIG.yeti.linkOnLogo,
  locale: () => YETI_CONFIG.yeti.locale || 'en',
  features: () => YETI_CONFIG.yeti.features || new Set(),
};

export default {
  getters,
};
