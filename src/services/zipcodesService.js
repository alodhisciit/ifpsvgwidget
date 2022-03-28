import api from '../hooks/api';
const service = 'zipcodes';

export const searchZipcodes = async (code) => {
    try {
        const response = await api.get(`/${service}/search/${code}`);
        return response;
    } catch (error) {
        throw error;
    }
};
