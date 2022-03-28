import Api from "../hooks/api";
const service = "homebuilders";

export const getSingleHomebuilder = async (homebuilderId) => {
  try {
    const response = Api.get(`/${service}/${homebuilderId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createHomebuilders = async (postdata) => {
  try {
    const { data } = await Api.post(`/${service}`, postdata);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateHomebuilders = async (id, postdata) => {
  try {
    const res = await Api.patch(`/${service}/${id}`, postdata);
    return res;
  } catch (error) {
    throw error;
  }
};
