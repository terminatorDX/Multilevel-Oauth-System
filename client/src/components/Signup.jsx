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
            isTeacher: false
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
        this.isTeacher = this.isTeacher.bind(this);
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
    isTeacher() {
        this.setState({
            isTeacher: !this.state.isTeacher
        });
    }

    onSignUp(event) {
        event.preventDefault();
        const {
            signUpName,
            signUpPassword,
            signUpPassword2,
            isTeacher
        } = this.state;
        if (
            !signUpName ||
            !signUpPassword ||
            !signUpPassword2 ||
            signUpPassword2 !== signUpPassword
        ) {
            console.warn(" all the forms are not filled");
            return;
        }
        console.log(signUpName, signUpPassword, signUpPassword2, isTeacher);
        fetch(`${route}/api/account/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: signUpName,
                password: signUpPassword,
                isTeacher: isTeacher
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log("json", json); //json is the object that is returned
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        isLoading: false
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
            signUpPassword2,
            signUpError,
            isTeacher
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
                            <h3 className="m-auto text-danger">
                                {/* {signUpError ? { signUpError } : null} */}
                            </h3>
                            <form
                                className="register-form"
                                id="register-form"
                                onSubmit={this.onSignUp}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={signUpName}
                                        onChange={
                                            this.onTextboxChangeSignUpName
                                        }
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
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
                                <div className="form-group form-button">
                                    <p className="lead my-auto">Are You a ?</p>
                                    <button
                                        type="button"
                                        name="isTeacher"
                                        id="isTeacher"
                                        onClick={this.isTeacher}
                                        className="form-submit">
                                        {isTeacher ? "Teacher" : "Student"}
                                    </button>
                                </div>
                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        name="signup"
                                        id="signup"
                                        className="btn btn-inline">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img
                                    src="images/signup-image.jpg"
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
