const express = require("express"),
    app = express(),
    passport = require("passport"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    key = require("./key"),
    baseRoutes = require("./controller/baseRoutes"),
    PORT = process.env.port || 4000,
    localUser = require("./controller/localUser");

app.use(cors());
app.use(session({ secret: key.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//mongodb
mongoose.connect(key.mongodb.MLab, {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
}); //end

app.use("/", baseRoutes);
app.use("/api/account/", localUser);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});
