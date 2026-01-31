import api from './axios';

// NETWORKS
export const getNetworks = () => api.get('/admin/networks');
export const createNetwork = (data) => api.post('/admin/networks', data);

// TOKENS
export const getTokens = () => api.get('/admin/tokens');
export const createToken = (data) => api.post('/admin/tokens', data);

// WEBHOOKS
export const getWebhooks = () => api.get('/admin/webhooks');
export const createWebhook = (data) => api.post('/admin/webhooks', data);

// STATS
export const getAdminStats = () => api.get('/admin/stats');
export const getNetworksFull = () =>
  api.get('/admin/networks-full');
