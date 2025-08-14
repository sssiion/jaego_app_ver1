import apiClient from './apiClient';

export const sendExpirationAlert = (inventoryId, message, expiryDate) =>
    apiClient.post(`/notifications/send-expiry-alert?inventoryId=${inventoryId}&message=${message}&expiryDate=${expiryDate}`);
