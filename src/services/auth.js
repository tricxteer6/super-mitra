import api from "./api";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
