import Api from "../hooks/api";

const service = "homes";
export const getAllHomes = async () => {
  try {
    const response = await Api.get(`/${service}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getHome = async (homeId) => {
  try {
    const { data } = await Api.get(`/${service}/${homeId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllHomesByFilter = async (filterdata) => {
  try {
    const response = await Api.get(
      `/${service}?search=${filterdata.search}&status=${filterdata.status}&city=${filterdata.city}&country=${filterdata.country}&pageno=${filterdata.pageno}&rows=${filterdata.rows}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHomesByCommunities = async (communityId, a) => {
  try {
    const response = await Api.get(
      `/${service}/community/${communityId}/?${a}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getHomesByCommunityAndFilter = async (communityId, filterdata) => {
  try {
    const response = await Api.get(
      `/${service}/community/${communityId}?search=${filterdata.search}&status=${filterdata.status}&city=${filterdata.city}&country=${filterdata.country}&pageno=${filterdata.pageno}&rows=${filterdata.rows}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSingleHome = async (id, postdata) => {
  try {
    const res = await Api.patch(`/${service}/${id}`, postdata);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateHomes = async (postdata) => {
  try {
    const res = await Api.patch(`/${service}`, postdata);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateHomesByHomeQuery = async (homeId, postdata) => {
  try {
    const res = await Api.patch(
      `/${service}/query/home_id-${homeId}`,
      postdata
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteHomes = async (id) => {
  try {
    const { data } = await Api.delete(`/${service}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
