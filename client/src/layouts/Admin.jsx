import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routes.js"; //TODO: this is bringing different routes in routes.js and sent to index.js

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={props => (
                            <prop.component {...props} /> //props => <Admin {...props}
                        )}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    render() {
        return (
            <div className="main">
                <Switch>{this.getRoutes(routes)}</Switch>
            </div>
        );
    }
}

export default Admin;
