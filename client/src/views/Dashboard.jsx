import React, { Component } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Student from "../views/Student";
import { getFromStorage } from "../utils/storage";
import { Route, Switch, Redirect, NavLink, Link } from "react-router-dom";
import routes from "../routes";
const route = "http://localhost:4000";
class Dashboard extends Component {
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
        const obj = getFromStorage("the_main_app");
        if (obj && obj.token) {
            console.log("inside the cdm of dashboard from localhost : ", obj);
            const { token } = obj;
            // Verify token that account previously stored is correct
            // fetch(`${route}/api/account/verify?token=` + token)
            //     .then(res => res.json())
            //     .then(json => {
            //         if (json.success) {
            //             console.log("cdm verify in dashboard :", json);
            this.setState({
                token, //original: token
                isLoading: false,
                isSignedin: true,
                isTeacher: obj.teacher
            });
            //             } else {
            //                 this.setState({
            //                     isLoading: false,
            //                     isSignedin: false
            //                 });
            //             }
            //         });
        }
    }
    onTeacherChange(e) {
        this.setState(state => ({
            isTeacher: e
        }));
    }
    onChange() {
        this.setState(state => ({
            isSignedin: !state.isSignedin
        }));
    }
    logsign() {
        this.setState(state => ({
            isSigning: !state.isSigning
        }));
    }
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (!this.state.isTeacher && prop.layout === "/nonadmin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={props => (
                            <prop.component {...props} /> //props => <Admin {...props}
                        )}
                        key={key}
                    />
                );
            }
            if (this.state.isTeacher && prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={props => (
                            <prop.component {...props} /> //props => <Admin {...props}
                        )}
                        key={key}
                    />
                );
            }
        });
    };
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
            if (isTeacher) {
                return (
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from="/" to="/admin/teacher" />
                    </Switch>
                );
            } else {
                return (
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from="/" to="/nonadmin/student" />
                    </Switch>
                );
            }
        }
        return (
            <div className="container mx-5">
                <h1 className="mx-auto">Wich one do you wanna choose??</h1>
                <button className="btn btn-primary" onClick={this.logsign}>
                    {isSigning ? "Login" : "Signin"}
                </button>
                <div className="main">
                    {isSigning ? (
                        <Login
                            isSignedin={isSignedin}
                            isTeacher={isTeacher}
                            onTeacherChange={this.onTeacherChange}
                            onNameChange={this.onChange}
                        />
                    ) : (
                        <Signup />
                    )}
                </div>
                <br />
            </div>
        );
    }
}
export default Dashboard;
