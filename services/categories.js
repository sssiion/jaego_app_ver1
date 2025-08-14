import apiClient from './apiClient';

export const getAllCategories = () =>
    apiClient.get('/categories');

export const getCategoriesWithCount = () =>
    apiClient.get('/categories/with-count');
