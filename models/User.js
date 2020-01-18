const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    isTeacher: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User", UserSchema);
