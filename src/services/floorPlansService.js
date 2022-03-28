import api from '../hooks/api';

const service = 'floorplans';

export const getFloorPlans = async () => {
    try {
        const { data } = await api.get(`${service}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getSingleFloorPlan = async (id) => {
    try {
        const { data } = await api.get(`/${service}/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getFloorPlansByHome = async (homeId) => {
    try {
        const response = await api.get(`/${service}/home/${homeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createFloorPlans = async (postData) => {
    try {
        const { data } = await api.post(`/${service}`, postData);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateFloorPlansByHome = async (homeId, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/home/${homeId}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateFloorPlansByQuery = async (query, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/query/${query}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateFloorPlan = async (id, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/${id}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};
