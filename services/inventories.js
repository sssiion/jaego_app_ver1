import apiClient from './apiClient';

export const getAllInventories = (page = 0, size = 20) =>
    apiClient.get(`/inventories?page=${page}&size=${size}`);

export const searchInventories = (keyword) =>
    apiClient.get(`/inventories/search?keyword=${encodeURIComponent(keyword)}`);

export const getUrgentInventories = (days) =>
    apiClient.get(`/inventories/urgent?days=${days}`);

export const getInventoryDetails = (id) =>
    apiClient.get(`/inventories/${id}`);
