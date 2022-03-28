import api from '../hooks/api';
const service = 'furniturecategories';

export const getFurnitureCategories = async () => {
    try {
        const { data } = await api.get(`/${service}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const createFurnitureCategory = async (data) => {
    try {
        const res = await api.post(`/${service}`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteManyFurnitureCategories = async (data) => {
    try {
        const res = await api.patch(`/${service}/delete/many`, data);
        console.log('res:', res);
        return res;
    } catch (error) {
        console.log('error: ', error);
        throw error;
    }
};
