export const getUser = () =>
  JSON.parse(localStorage.getItem("user"));

export const isLoggedIn = () => !!getUser();

export const logout = () =>
  localStorage.removeItem("user");
