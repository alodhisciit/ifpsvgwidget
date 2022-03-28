import api from '../hooks/api';

const service = 'svgfloorplans';

export const getSvgFloorPlans = async () => {
    try {
        const { data } = await api.get(`${service}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getSingleSvgFloorPlan = async (id) => {
    try {
        const { data } = await api.get(`/${service}/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getSvgFloorPlansByHome = async (homeId) => {
    try {
        const response = await api.get(`/${service}/home/${homeId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createSvgFloorPlans = async (postData) => {
    try {
        const { data } = await api.post(`/${service}`, postData);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateSvgFloorPlansByHome = async (homeId, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/home/${homeId}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateSvgFloorPlansByQuery = async (query, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/query/${query}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateSvgFloorPlan = async (id, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/${id}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateSvgFloorPlanOptions = async (id, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/options/${id}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};
