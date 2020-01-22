import React, { Component } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSigning: true,
             isTeacher: false
        };
        this.logsign = this.logsign.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }
    logsign() {
        const { isSigning } = this.state;
        this.setState({ isSigning: !isSigning });
    }
    render() {
        const { isLoading, isSigning, isTeacher } = this.state;
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
                <button className="btn btn-primary" onClick={this.logsign}>
                    {isSigning ? "Login" : "Signin"}
                </button>
                <div className="main">
                    {isSigning ? (
                        <Login isTeacher={isTeacher} />
                    ) : (
                        <Signup isTeacher={isTeacher} />
                    )}
                </div>

                <br />
            </div>
        );
    }
}
