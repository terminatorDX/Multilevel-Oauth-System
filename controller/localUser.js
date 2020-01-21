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
    let usernameAlreadyChosen = false;
    console.log("value recieved at /signup :", name, password);
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
    let errors = [];
    const { body } = req;
    let { name } = body;
    const { password } = body;
    let userExists = false;
    User.find({
        name: name
    })
        .then((user, err) => {
            userExists = true;
            console.log("newuser at login : ", user);
            if (err) {
                console.log(err);
                errors = "Error : server error";
                return res.send({
                    success: false,
                    message: errors
                });
            }
            if (!userExists || password !== user.password) {
                errors = "password is not correct";
                return res.send({
                    success: false,
                    message: errors
                });
            }
            // Otherwise correct user
            const userSession = new UserSession();
            userSession.userId = user._id;
            req.session.user = user;
            req.session.localUser = user;
            return res.send({
                success: true,
                message: "Valid sign in",
                token: doc._id
            });
        })
        .catch(err => {
            errors = "user does not exist";
            console.log(err);
            return res.send({
                success: false,
                message: errors
            });
        });
});

Router.get("/logout", (req, res) => {
    console.log("logging out : " + user);
    UserSession.findOneAndUpdate(
        {
            _id: user.id,
            isDeleted: false
        },
        {
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
module.exports = Router;
