import React, { Component } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSigning: false
        };
    }
    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }
    render() {
        const { isLoading, isSigning } = this.state;
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <div className="container mx-5">
                <h1 className="mx-auto">Wich one do you wanna choose??</h1>
                <Signup />
                <Login />
                <br />
            </div>
        );
    }
}
