import apiClient from './apiClient';

export const getUrgentProducts = (type, days) =>
    apiClient.get(`/expiration/urgent?type=${type}&days=${days}`);

export const getExpiringToday = () =>
    apiClient.get(`/expiration/today`);
