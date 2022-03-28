import api from '../hooks/api';
const service = 'furnitures';

export const createFurnitures = async (postdata) => {
    try {
        const { data } = await api.post(`/${service}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateManyFurnitures = async (categoryId, postdata) => {
    try {
        const res = await api.patch(`/${service}/category/${categoryId}`, postdata);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getFurnituresWithCategory = async () => {
    try {
        const { data } = await api.get(`/${service}/with/category`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getFurnituresForHomebuilder = async (postData) => {
    try {
        const { data } = await api.post(`/${service}/getFurnituresForHomebuilder`, postData);
        return data;
    } catch (error) {
        throw error;
    }
};
export const getFurnituresByCategory = async (furnitureCategoryId) => {
    try {
        const { data } = await api.get(`/${service}/category/${furnitureCategoryId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteFurniture = async (id) => {
    try {
        const res = await api.delete(`/${service}/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteManyFurnitures = async (data) => {
    try {
        const res = await api.patch(`/${service}/delete/many`, data);
        return res;
    } catch (error) {
        throw error;
    }
};
