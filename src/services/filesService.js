import api from '../hooks/api';

export const filesUpload = async (data) => {
    try {
        const res = await api.post('/files/upload', data);
        console.log('res: ', res);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getFiles = async (mimeType) => {
    try {
        const { data } = await api.get(`/files/fetch/?mimeType=${encodeURIComponent(mimeType)}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getSingleFile = async (id) => {
    try {
        const { data } = await api.get(`/files/fetch/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteFile = async (id) => {
    try {
        console.log('id: ', id);
        const response = await api.delete(`/files/${id}`);
        // console.log('delete response: ', response);
        return response;
    } catch (error) {
        throw error;
    }
};
