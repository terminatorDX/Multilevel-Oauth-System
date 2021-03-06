// localhost:4000/api/account/<Route>
const Router = require("express").Router(),
    User = require("../models/User"),
    UserSession = require("../models/UserSession");
// bcrypt = require("bcrypt"),
// salt = bcrypt.genSaltSync(10);

Router.post("/signup", (req, res) => {
    let errors = "";
    const { body } = req;
    let { name } = body;
    const { password } = body;
    const { isTeacher } = body;
    let usernameAlreadyChosen = false;
    console.log("value recieved at /signup :", name, password, isTeacher);
    User.findOne({ name: name })
        .then(user => {
            if (user) {
                usernameAlreadyChosen = true;
                errors = `name : ${req.body.name} is already in use`;
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server error"
                    });
                }
                return res.send({
                    success: false,
                    message: errors
                });
            }
        })
        .then(() => {
            if (errors || usernameAlreadyChosen) {
                console.log("errors: ", errors);
                return res.send({
                    success: false,
                    message: errors
                });
            }
            let newuser = new User();
            newuser.name = name;
            newuser.password = password;
            newuser.isTeacher = isTeacher;
            console.log("newuser : ", newuser);
            newuser.save((err, user) => {
                if (err) {
                    errors = "error in signup redirect";
                    return res.send({
                        success: false,
                        message: errors
                    });
                }
                return res.send({
                    success: true,
                    message: "Signed up"
                });
            });
        }); //end of then
});

Router.post("/login", (req, res) => {
    let errors = "";
    const { body } = req;
    let { name } = body;
    const { password } = body;
    console.log("values recieved at /login : ", name, password);
    User.find({
            name: name
        })
        .then((user, err) => {
            userExists = true;
            console.log("user found :", user);
            if (err) {
                errors = "Error : server error";
                console.warn(errors);
                return res.send({
                    success: false,
                    message: errors
                });
            }
            const userSession = new UserSession();
            userSession.userId = user._id;
            console.log("newusersession at login : ", userSession);
            req.session.user = user;
            req.session.localUser = user;
            userSession.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: "Error: server error"
                    });
                }
                return res.send({
                    success: true,
                    token: doc._id,
                    message: "Valid sign in",
                    teacher: req.session.user[0].isTeacher
                });
            });
        })
        .catch(err => {
            errors = "user does not exist";
            console.warn(err);
            return res.send({
                success: false,
                message: errors
            });
        });
});

Router.get("/logout", (req, res) => {
    console.log("logging out : " + user);
    UserSession.findOneAndUpdate({
            _id: user.id,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        },
        null,
        (err, sessions) => {
            if (err) {
                console.log(err);
                error = "Error: Server error";
                return res.send({
                    success: false,
                    message: error
                });
            }
        }
    );
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
    });
});

Router.get("/verify", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    console.log("in localuser /verify :", token);
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    User.find({
            _id: token,
            isDeleted: false
        })
        .then((user, err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error : server error"
                });
            }
            if (user) {
                return res.send({
                    success: true,
                    message: "A Person has been found",
                    isTeacher: user.isTeacher
                })
            }
            return res.send({
                success: false,
                message: "A Person not found",
            })

        })
        .catch(err => {
            errors = "user does not exist";
            console.warn(err);
            return res.send({
                success: false,
                message: errors
            });
        });
});

module.exports = Router