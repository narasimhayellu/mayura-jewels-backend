const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {

                const phoneRegex = /^[0-9]{10}$/;

                const allSameDigits = /^(\d)\1+$/.test(value);

                return phoneRegex.test(value) && !allSameDigits;
            },
            message:
                "Enter a valid 10-digit mobile number. All zeros or repeated digits are not allowed.",
        },
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
    },
    subscribe: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("user", userSchema);