import api from "./axios";

export const addTransaction = (data) =>
  api.post("/transactions/add", data);
