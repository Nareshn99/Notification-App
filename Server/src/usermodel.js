const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true

        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    }, { timestamps: true });

module.exports=mongoose.model("User", userSchema)