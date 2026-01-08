import api from "./axios.js";

export const loginApi = async ({ username, password }) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};


export const signupApi = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};
