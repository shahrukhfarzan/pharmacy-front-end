import axios from ".";

/**
 * 
 * @returns 
 */
export const getExecutives = async () => {
  try {
    let { data } = await axios.get("auth/");
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 *
 * @param {*} body
 * @returns
 */
export const createExecutives = async (body) => {
  try {
    let { data } = await axios.post("auth/register", body);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
