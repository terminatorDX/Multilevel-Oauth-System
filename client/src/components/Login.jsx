import React, { Component } from "react";
import { setInStorage } from "../utils/storage";
const route = "http://localhost:4000";

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            logInError: "",
            logInName: "",
            logInPassword: "",
            token: "",
            setProfession: ""
        };
        this.onTextboxChangeLogInName = this.onTextboxChangeLogInName.bind(
            this
        );
        this.onTextboxChangeLogInPassword = this.onTextboxChangeLogInPassword.bind(
            this
        );
        this.setProfession = this.setProfession.bind(this);
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
    setProfession(event) {
        console.log(event.target.value);
        this.setState({
            setProfession: event.target.value
        });
    }

    onLogIn() {
        const { logInName, logInPassword, selectedOption } = this.state;
        if (!logInName || !logInPassword || selectedOption) {
            alert("Please fill out the form");
            return;
        }
        console.log(logInName, logInPassword, selectedOption);
        // Post request to backend
        fetch(`${route}/api/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: logInName,
                password: logInPassword,
                selectedOption: selectedOption
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log("json", json);
                if (json.success) {
                    setInStorage("the_main_app", { token: json.token });
                    this.setState({
                        logInError: json.message,
                        isLoading: false,
                        token: json.token
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
        const {
            isLoading,
            logInName,
            logInPassword,
            logInError,
            token
        } = this.state;
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        if (token) {
            return <div className="bg-dark text-white">{token}</div>;
        }
        return (
            <section className="login" id="sign-up">
                <div className="container">
                    <div className="login-content">
                        <div className="login-form">
                            <h2 className="form-title">Log in</h2>
                            <h3 className="m-auto text-danger">
                                {logInError ? { logInError } : null}
                            </h3>
                            <form className="register-form" id="register-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={logInName}
                                        onChange={this.onTextboxChangeLogInName}
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
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
                                <div
                                    className="form-group"
                                    onChange={this.setProfession}>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="Teacher"
                                            value={"student"}
                                        />
                                        Student
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="Teacher"
                                            value={"teacher"}
                                        />
                                        Teacher
                                    </div>
                                </div>
                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        name="login"
                                        id="login"
                                        onClick={this.onLogIn}
                                        className="form-submit">
                                        Log In
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
