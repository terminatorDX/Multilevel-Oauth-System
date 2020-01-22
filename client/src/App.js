import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Admin from "./layouts/Admin";
import NonAdmin from "./layouts/NonAdmin";
import NotFound from "./components/NotFound";
import Dashboard from "./views/Dashboard";
function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" component={Dashboard} />
                <Route path="/admin" render={props => <Admin {...props} />} />

                <Route
                    path="/nonadmin"
                    render={props => <NonAdmin {...props} />}
                />
                <Redirect from="/admin" to="/admin/dashboard" />
                <Redirect from="/nonadmin" to="/nonadmin/dashboard" />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
