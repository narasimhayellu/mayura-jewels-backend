const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const transporter = require("../config/emailConfig");
const otpGenerator = require("otp-generator");
const sendEmail = require("../config/emailConfig");

const registerUser = async (req, res) => {
        console.log("REGISTER API HIT");
    try {
        const {
            username,
            email,
            phone_number,
            password,
            password_confirmation,
        } = req.body;

        if (
            !username ||
            !email ||
            !phone_number ||
            !password ||
            !password_confirmation
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password !== password_confirmation) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            phone_number,
            password: hashedPassword,
        });

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          
        user.otp = otp;

        user.otpExpires = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail({
            to: user.email,
            subject: "Your OTP - Mayura Jewels",
            html: `<p>Your OTP is: <b>${otp}</b></p><p>Valid for 10 minutes.</p>`
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });

        console.log("OTP Sent:", otp);
    } catch (error) {

    console.log("REGISTER ERROR:");
    console.log(error);

    res.status(500).json({
        message: error.message,
    });
}
};

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const user = await User.findOne({
            $or: [
                { email: email },
                { phone_number: email },
            ],
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            success: true,
            token,
            user,
            message: "Login Successful",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const sendOtp = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        user.otp = otp;

        user.otpExpires = Date.now() + 5 * 60 * 1000;

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: user.email,

            subject: "Your OTP Code",

            html: `
          <h2>Your OTP is:</h2>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes</p>
        `,
        });

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (!user.otpExpires || user.otpExpires.getTime() < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({
            success: true,
            token,
            user,
            message: "OTP Login Successful",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp
};