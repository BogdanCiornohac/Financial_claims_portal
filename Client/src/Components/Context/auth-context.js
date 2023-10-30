import { createContext } from "react";

export const AuthContex = createContext({
  user: {},
  login: () => {},
  logout: () => {},
});
