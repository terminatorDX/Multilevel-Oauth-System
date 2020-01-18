// localhost:4000/api/account/<Route>
const Router = require("express").Router(),
    User = require("../models/User");
// bcrypt = require("bcrypt"),
// salt = bcrypt.genSaltSync(10);

Router.post("/signup", (req, res) => {
    console.log("--------------------------------------------------------");
    let errors = [];
    const { body } = req;
    let { name } = body;
    const { password } = body;
    let usernameAlreadyChosen = false;
    console.log(name, password);
    User.findOne({ name: name })
        .then(user => {
            if (user) {
                usernameAlreadyChosen = true;
                errors.push("name", req.body.name, "is already in use");
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server error"
                    });
                } else {
                    return res.send({
                        success: false,
                        message: "Error: Account already exist."
                    });
                }
            }
        }) //end of then
        .then(() => {
            if (errors.length > 0 || usernameAlreadyChosen) {
                console.log("errors: ", errors);
            } else {
                let newuser = new User();
                newuser.name = name;
                newuser.password = password; //bcrypt.hashSync(password, salt);
                newuser.save((err, user) => {
                    if (err) {
                        console.warn("error in signup redirect");
                        return res.send({
                            success: false,
                            message: "Error: Server error"
                        });
                    }
                    req.session.localUser = user;
                    return res.send({
                        success: true,
                        message: "Signed up"
                    });
                });
            }
        }); //end of then
});

Router.post("/login", (req, res) => {
    let errors = [];
    User.find({
        username: req.body.username
    })
        .then(user => {
            let userExists = user;
            if (
                userExists
                //  && bcrypt.compareSync(req.body.password, user.password) === true
            ) {
                req.session.user = user;
            } else {
                errors.push("could not log in");
            }
        })
        .catch(err => {
            errors.push("user does not exist");
            console.log(err);
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
                return res.send({
                    success: false,
                    message: "Error: Server error"
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
