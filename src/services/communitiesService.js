import api from '../hooks/api';
const service = 'communities';

export const getCommunitiesByHomebuilder = async (homebuilderId) => {
    try {
        const response = await api.get(`/${service}/homebuilder/${homebuilderId}`);
        return response;
    } catch (error) {
        throw error;
    }
};
