import api from "./axios";

// Signup API
export const signup = (data) => api.post("/auth/signup", data);

// Login API (OAuth2 requires form-data)
export const login = (email, password) => {
  const form = new FormData();
  form.append("username", email);
  form.append("password", password);
  return api.post("/auth/login", form);
};
