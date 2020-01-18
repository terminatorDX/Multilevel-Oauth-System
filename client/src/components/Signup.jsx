import React, { Component } from "react";
const route = "http://localhost:4000";

export default class Student extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            signUpError: "",
            signUpName: "",
            signUpPassword: "",
            signUpPassword2: "",
            error: []
        };
        this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(
            this
        );
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
            this
        );
        this.onTextboxChangeSignUpPassword2 = this.onTextboxChangeSignUpPassword2.bind(
            this
        );
        this.onSignUp = this.onSignUp.bind(this);
    }
    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value
        });
    }
    onTextboxChangeSignUpPassword2(event) {
        this.setState({
            signUpPassword2: event.target.value
        });
    }
    onTextboxChangeSignUpName(event) {
        this.setState({
            signUpName: event.target.value
        });
    }

    onSignUp() {
        // Grab state
        const { signUpName, signUpPassword, signUpPassword2 } = this.state;

        if (
            !signUpName ||
            !signUpPassword ||
            !signUpPassword2 ||
            signUpPassword2 !== signUpPassword
        ) {
            alert("Hello! I am an alert box!!");
            return;
        }
        console.log(signUpName, signUpPassword, signUpPassword2);
        // Post request to backend
        fetch(`${route}/api/account/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: signUpName,
                password: signUpPassword
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log("json", json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signUpName: "",
                        signUpPassword: "",
                        signUpPassword2: ""
                    });
                } else {
                    this.setState({
                        signUpError: json.message,
                        isLoading: true
                    });
                }
            });
    }
    render() {
        const {
            isLoading,
            signUpName,
            signUpPassword,
            signUpPassword2
        } = this.state;
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <section className="signup" id="sign-up">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form className="register-form" id="register-form">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        value={signUpName}
                                        onChange={
                                            this.onTextboxChangeSignUpName
                                        }
                                        name="name"
                                        id="name"
                                        placeholder="Your Email"
                                        className="px-4"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        value={signUpPassword}
                                        onChange={
                                            this.onTextboxChangeSignUpPassword
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
                                        value={signUpPassword2}
                                        onChange={
                                            this.onTextboxChangeSignUpPassword2
                                        }
                                        type="password"
                                        name="password2"
                                        id="pass2"
                                        placeholder="COnfirm Password"
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
                                        name="signup"
                                        id="signup"
                                        onClick={this.onSignUp}
                                        className="form-submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img
                                    src="images/signin-image.jpg"
                                    alt="visual for signup.js"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
