// import axios from "./";

// export const getOrdersApi =async () => {
//   try {
//       let {data} = await axios.get("/")
//   } catch (e) {}
// };
import axios from "./";
export const newOrderApi = async (body) => {
  try {
    let { data } = await axios.post("orders", body);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
export const getOrdersApi = async () => {
  try {
    let { data } = await axios.get("orders");
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
