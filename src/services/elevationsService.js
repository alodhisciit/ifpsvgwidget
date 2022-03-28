import api from '../hooks/api';

const service = 'elevations';

export const getElevation = async (id) => {
    try {
        const { data } = await api.get(`/${service}/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getElevationsByHome = async (homeId) => {
    try {
        const { data } = await api.get(`/${service}/home/${homeId}`);
        console.log('homeid', data);
        return data;
    } catch (error) {
        throw error;
    }
};

export const createElevations = async (postData) => {
    try {
        const { data } = await api.post(`/${service}`, postData);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateElevationsByHome = async (homeId, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/home/${homeId}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateElevation = async (id, postdata) => {
    try {
        const { data } = await api.patch(`/${service}/${id}`, postdata);
        return data;
    } catch (error) {
        throw error;
    }
};
