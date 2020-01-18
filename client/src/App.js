import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Admin from "./layouts/Admin";
import NotFound from "./components/NotFound";
function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/admin" render={props => <Admin {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
