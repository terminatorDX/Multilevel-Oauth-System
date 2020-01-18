import React, { Component } from "react";
const route = "http://localhost:4000";

export default class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            logInError: "",
            logInName: "",
            logInPassword: "",
            error: []
        };
        this.onTextboxChangeLogInName = this.onTextboxChangeLogInName.bind(
            this
        );
        this.onTextboxChangeLogInPassword = this.onTextboxChangeLogInPassword.bind(
            this
        );
        this.onLogIn = this.onLogIn.bind(this);
    }
    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    onTextboxChangeLogInPassword(event) {
        this.setState({
            logInPassword: event.target.value
        });
    }
    onTextboxChangeLogInName(event) {
        this.setState({
            logInName: event.target.value
        });
    }

    onLogIn() {
        // Grab state
        const { logInName, logInPassword } = this.state;

        if (!logInName || !logInPassword) {
            alert("Hello! I am an alert box!!");
            return;
        }
        console.log(logInName, logInPassword);
        // Post request to backend
        fetch(`${route}/api/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: logInName,
                password: logInPassword
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log("json", json);
                if (json.success) {
                    this.setState({
                        logInError: json.message,
                        isLoading: false,
                        logInName: "",
                        logInPassword: ""
                    });
                } else {
                    this.setState({
                        logInError: json.message,
                        isLoading: true
                    });
                }
            });
    }
    render() {
        const { isLoading, logInName, logInPassword } = this.state;
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <section className="login" id="sign-up">
                <div className="container">
                    <div className="login-content">
                        <div className="login-form">
                            <h2 className="form-title">Sign up</h2>
                            <form className="register-form" id="register-form">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        value={logInName}
                                        onChange={this.onTextboxChangeLogInName}
                                        name="name"
                                        id="name"
                                        placeholder="Your Email"
                                        className="px-4"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        value={logInPassword}
                                        onChange={
                                            this.onTextboxChangeLogInPassword
                                        }
                                        type="password"
                                        name="password"
                                        id="pass"
                                        placeholder="Password"
                                        className="px-4"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="checkbox"
                                        name="agree-term"
                                        id="agree-term"
                                        className="agree-term"
                                    />
                                    <label
                                        htmlFor="agree-term"
                                        className="label-agree-term">
                                        <span>
                                            <span />
                                        </span>
                                        I agree all statements in{" "}
                                        <strong className="term-service">
                                            Terms of service
                                        </strong>
                                    </label>
                                </div>
                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        name="login"
                                        id="login"
                                        onClick={this.onLogIn}
                                        className="form-submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img
                                    src="images/login-image.jpg"
                                    alt="visual for login.js"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
