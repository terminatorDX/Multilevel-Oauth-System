import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>Page not found</h2>

                <Link to="/">Go home</Link>
            </div>
        );
    }
}
