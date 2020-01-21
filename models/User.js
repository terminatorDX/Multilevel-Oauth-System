const mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
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
