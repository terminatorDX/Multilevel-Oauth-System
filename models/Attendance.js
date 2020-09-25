const mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        id: 43243,
        subject: {
            maths: {
                type: integer,
                default: 0
            },
            physics: {
                type: integer,
                default: 0
            },
            chemistry: {
                type: integer,
                default: 0
            }
        }
    });

module.exports = mongoose.model("User", UserSchema);
