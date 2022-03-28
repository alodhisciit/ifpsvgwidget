import api from '../hooks/api';

const service = 'flooroptions';
export const getFloorOptions = async () => {
    try {
        const { data } = await api.get(`/${service}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getSingleFloorOption = async (id) => {
    try {
        const { data } = await api.get(`/${service}/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getFloorOptionsByFloorPlan = async (id) => {
    try {
        const { data } = await api.get(`/${service}/floorplan/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getOptionsByFloorPlan = async (floorPlanId) => {
    try {
        const response = await api.get(`/${service}/floorplan/${floorPlanId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createFloorOptions = async (postData) => {
    try {
        const response = await api.post(`/${service}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateFloorOptions = async (id, postData) => {
    try {
        const response = await api.patch(`/${service}/${id}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateFloorOptionsByFloorPlan = async (floorPlanId, postData) => {
    try {
        const response = await api.patch(`/${service}/floorplan/${floorPlanId}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateFloorOptionsByQuery = async (floorPlanId, postData) => {
    try {
        const response = await api.patch(`/${service}/floorplan/${floorPlanId}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

// floorOptionCoordinates

export const updateFloorOptionCoordinates = async (req) => {
    try {
        const response = await api.patch(`/${service}/floorOptionCoordinates/update`, req);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteFloorOptionsByFloorPlan = async (floorPlanId, postData) => {
    try {
        const response = await api.patch(`/${service}/floorplan/${floorPlanId}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};
