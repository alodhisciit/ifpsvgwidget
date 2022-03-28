import api from '../hooks/api';

const service = 'flooroptionrules';

export const getFloorOptionRules = async () => {
    try {
        const response = await api.get(`/${service}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getFloorOptionRule = async (id) => {
    try {
        const response = await api.get(`/${service}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getFloorOptionRulesByFloorPlan = async (floorPlanId) => {
    try {
        const response = await api.get(`/${service}/floorplan/${floorPlanId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createFloorOptionRule = async (postData) => {
    try {
        const response = await api.post(`/${service}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateFloorOptionRule = async (id, postData) => {
    try {
        const response = await api.patch(`/${service}/${id}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateManyFloorOptionRules = async (postData) => {
    try {
        const response = await api.patch(`/${service}/update/many/rules`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateFloorOptionRulesByFloorPlan = async (floorPlanId, postData) => {
    try {
        const response = await api.patch(`/${service}/floorplan/${floorPlanId}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateFloorOptionRulesByFloorPlanAndOption = async (floorPlanId, floorOptionId, postData) => {
    try {
        const response = await api.patch(`/${service}/${floorPlanId}/${floorOptionId}`, postData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteFloorOptionRule = async (id) => {
    try {
        const response = await api.delete(`/${service}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteManyFloorOptionRules = async (floorPlanId, floorOptions) => {
    try {
        const response = await api.patch(`/${service}/delete/many/rules/${floorPlanId}`, floorOptions);
        return response;
    } catch (error) {
        throw error;
    }
};
