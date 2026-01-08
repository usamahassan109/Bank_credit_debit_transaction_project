import api from "./axios.js";

export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};
