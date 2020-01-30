import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./components/NotFound";
import "./index.css";
import Dashboard from "./views/Dashboard";
import ReactDOM from "react-dom";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route strict path="/" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
