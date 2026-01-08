import api from "./axios.js";

export const addTransaction = async (data) => {
  const res = await api.post("/transactions/add", data);
  return res.data;
};
