import React, { Component } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { getFromStorage } from "../utils/storage";
const route = "http://localhost:4000";
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSigning: true,
            isTeacher: false,
            isSignedin: false,
            token: ""
        };
        this.logsign = this.logsign.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTeacherChange = this.onTeacherChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            isSignedin: false
        })
        // this.timerID = setInterval(() => this.tick(), 1000);
    }
    tick() {
        const obj = getFromStorage("the_main_app");
        if (obj && obj.token) {
            console.log("inside the cdm of dashboard : ", obj);
            const { token } = obj;
            // Verify token that account previously stored is correct
            fetch(`${route}/api/account/verify?token=` + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log("cdm verify in dashboard :", json);
                        this.setState({
                            token,
                            isLoading: false,
                            isSignedin: true
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            isSignedin: false
                        })
                    }
                });
        }
        this.setState({
            isLoading: false
        });
    }
    onChange() {
        this.setState(state => ({
            isSignedin: !state.isSignedin
        }));
    }
    onTeacherChange(e) {
        this.setState(state => ({
            isTeacher: e
        }));
    }
    logsign() {
        this.setState(state => ({
            isSigning: !state.isSigning
        }));
    }
    render() {
        const { isLoading, isSigning, isSignedin, isTeacher } = this.state;
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        if (isSignedin) {
            return <h1>logged in as : {isTeacher ? "  a teacher" : "  a student"}</h1>;
        }
        return (
            <div className="container mx-5">
                <h1 className="mx-auto">Wich one do you wanna choose??</h1>
                <button className="btn btn-primary" onClick={this.logsign}>
                    {isSigning ? "Login" : "Signin"}
                </button>
                <div className="main">{isSigning ? <Login isSignedin={isSignedin} isTeacher={isTeacher} onTeacherChange={this.onTeacherChange} onNameChange={this.onChange} /> : <Signup />}</div>
                <br />
            </div>
        );
    }
}
