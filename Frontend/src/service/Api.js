import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

export const GetCategories = () => API.get("/category/getAll");
export const GetFoods = (search = "") => API.get("/food/getAll", { params: { search } });
export const DeleteFood = (id) => API.delete(`/food/deleteById/${id}`);
export const GetOrders = () => API.get("/order/getAll");
export const UpdateOrderStatus = (id, data) => API.put(`/order/status/${id}`, data);
export const GetProfile = (id) => API.get(`/profile/get/${id}`);
export const UpdateProfile = (id, formData) =>
  API.put(`/profile/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const GetUsers = (search = "") => API.get("/user/getAll", { params: { search } });
export const DeleteUser = (id) => API.delete(`/user/deleteById/${id}`);