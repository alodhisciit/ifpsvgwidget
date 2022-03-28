import api from '../hooks/api';
const service = 'users';

export const getAllUsers = async () => {
    try {
        const response = await api.get(`/${service}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await api.get(`/${service}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (postdata) => {
    try {
        const response = await api.post(`/${service}`, postdata);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, postdata) => {
    try {
        const response = await api.post(`/${service}/${id}`, postdata);
        console.log('login response: ', response);
        return response;
    } catch (error) {
        console.log('login error: ', error);
        throw error;
    }
};

export const loginUser = async (postdata) => {
    try {
        const response = await api.post(`/${service}/login`, postdata);
        return response;
    } catch (error) {
        console.log('wth: ', error);
        throw error;
    }
};
