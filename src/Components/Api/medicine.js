import axios from ".";

export const getMedicineApi = async () => {
  try {
    let { data } = await axios.get("/medicine");
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createMedicine = async (body) => {
  try {
    let { data } = await axios.post("/medicine", body);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
