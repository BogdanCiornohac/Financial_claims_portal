import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import { AuthContex } from "./Components/Context/auth-context";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
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
    <AuthContex.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContex.Provider>
  );
};

export default Router;
