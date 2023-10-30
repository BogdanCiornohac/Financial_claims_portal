import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import Layout from "./Components/Layout/Layout";
import { AuthContex } from "./Components/Context/auth-context";

const Router = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: "",
    isAdmin: false,
  });
  console.log(user);
  const login = useCallback((id, isAdmin) => {
    setUser({ isLoggedIn: true, id, isAdmin });
    localStorage.setItem(
      "user",
      JSON.stringify({ isLoggedIn: true, id, isAdmin })
    );
  }, []);

  const logout = useCallback(() => {
    setUser({ isLoggedIn: false, id: "", isAdmin: false });
    localStorage.removeItem("user");
  }, []);
  const cachedLoggedUser = () => {
    let userData = localStorage.getItem("user");
    if (userData) {
      console.log(userData);
      const data = JSON.parse(userData);
      setUser(data);
    }
  };
  useEffect(() => {
    cachedLoggedUser();
  }, []);

  let routes;

  if (user.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Redirect to="/">
          <LandingPage />
        </Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/auth">
          <AuthPage />
        </Redirect>
      </Switch>
    );
  }

  return (
    <AuthContex.Provider value={{ user: user, login: login, logout: logout }}>
      <Layout>
        <BrowserRouter>{routes}</BrowserRouter>
      </Layout>
    </AuthContex.Provider>
  );
};

export default Router;
