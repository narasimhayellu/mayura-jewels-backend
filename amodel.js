// const otpGenerator = require("otp-generator");
// const { transporter } = require("./config/emailConfig");
// const user = require("./models/user");
// const user = require("./models/user");

const { default: mongoose } = require("mongoose");
const { transporter } = require("./config/emailConfig");
const user = require("./models/user");
const user = require("./models/user");

// const registerUser = async (req, res) => {
//     const { email, username, password, phone_number, confirm_password } = req.body

//     if (!email || !password || !username || !phone_number || !confirm_password) {
//         return res.status(400).json({
//             message: "all fields are required"
//         })
//     }

//     const existingUser = userModel.findOne({ email });

//     if (!existingUser) {
//         return res.status(400).json({
//             message: "email id already exists"
//         })
//     }

//     const hashedPassword = bcrypt.hash(password, 10);

//     const user = userModel.create({
//         email,
//         username,
//         password: hashedPassword,
//         phone_number
//     })

//     const otp = otpGenerator.generate(6,{
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//     })

//     user.otp = otp

//     otp.otpExpires = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     await transporter.sendMail({
//         from:process.env.EMAIL_USER,
//         to:user.email,
//         subject:"",
//         html:``
//     })

//     res.status(201).json({
//         message:"",
//         user,
//         success:true
//     })
// }

// const loginUser = async(req,res)=>{
//     try {
//         const {email,password} = req.body

//         if(!email || !password){
//             return res.status(400).json({
//                 message:""
//             })
//         }

//         const user = userModel.findOne({
//             $or:[
//                 {email:user.email},
//                 {phpne_number:user.phone_number}
//             ]
//         })

//         const isMatch = await bcrypt.compare(
//             password,user.password
//         )

//         if(!isMatch){
//             return res.status(400).json({
//                 message:""
//             })
//         }

//         const token = jwtwebtoken.sign({
//             id:user._id,
//             email:user.email,
//         },
//         process.env.JWT,
//         {
//             expiresIn:"7d"
//         }

//     )

//         res.json({
//             success:true,
//             message:"",
//             user,
//             token
//         })
//     } catch (error) {
        
//     }
// }

// const sendOtp = async(req,res)=>{
//     const {email} = req.body

//     const user = userModel.findOne({email});

//     const otp = otpGenerator.generate(6,{
//         upperCaseAlphabets:false,
//         lowerCaseAlphabets:false,
//         specialChars:false
//     })

//     user.otp = otp

//     user.otpExpires = Date.now() + 5*60*1000;

//     await user.save();

//     await transporter.sendMail({
//         from:process.env.EMAIL_USER,
//         to:user.email,
//         subject:"",
//         html:``
//     })

//     res.status(200).json({
//         message:"",
//         user,
//         success:true
//     })
// }

// const verifyOtp = async(req,res)=>{
//     try {
//         const {email,otp} = req.body

//         const user = userModel.findOne({email});

//         const token = jsonwebtoken.sign({
//             id:user._id,
//             email:user.email
//         },
//         process.env.JWT,
//         {
//             expiresIn:"7d"
//         })

//         user.otp = null;
//         user.otpExpires = null

//         await user.save()

//         res.json({
//             success:true,
//             user,
//             token,
//             message:""
//         })
//     } catch (error) {
        
//     }
// }

// module.exports = {registerUser,loginUser,sendOtp,verifyOtp}

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDb = require("./config/db");
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// connectDb();

// app.use("/api/auth/backend",require("./routes/authRoutes"))

// PORT = process.env.PORT
// app.listen(PORT,()=>{})

// const mongoose = require("mongoose");

// const connectDb = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("")
//     } catch (error) {
//         console.log("",error.message);
//     }
// }

// module.exports = connectDb;

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:process.env.EMAIL_USER,
//                 pass:process.env.EMAIL_PASS
//             }
            
//         })

// module.exports = transporter;
