import { createContext } from "react";

export const AuthContex = createContext({
  isLoggedIn: false,
  id: '',
  login: () => {
  },
  logout: () => { },
});
