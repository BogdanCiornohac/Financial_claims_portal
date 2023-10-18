import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import LandingPage from "./Pages/LandingPage";

const Router = ()=>{
  return (
  <BrowserRouter>
    <Switch>
    <Route path="/" exact>
      <LandingPage/>
    </Route>
    <Redirect to="/">
      <LandingPage/>
    </Redirect>
    </Switch>
  </BrowserRouter>
  );
}

export default Router;

