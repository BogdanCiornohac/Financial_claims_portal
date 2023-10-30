import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import Layout from "./Components/Layout/Layout";
import { AuthContex } from "./Components/Context/auth-context";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState("");
  console.log(userId);
  const login = useCallback((id) => {
    setIsLoggedIn(true);
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId("");
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
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <Layout>
        <BrowserRouter>{routes}</BrowserRouter>
      </Layout>
    </AuthContex.Provider>
  );
};

export default Router;
