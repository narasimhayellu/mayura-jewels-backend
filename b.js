// reverse a string
// remove duplicates
// sum of elements
// palindrome
// closure
// var let const
// addition 7 + '1' = '71'
// sub,div,multip 4 - '1'= 3
// 0,null,undefined,nan are flsy values others true values
// this refers to the object that called the function. If called in the global scope, it refers to the window
// const obj = {
//     name: 'Alice',
//     arrowFn: () => { console.log(this.name); }
// };
// obj.arrowFn();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 8000 
app.listen(PORT,()=>console.log(`server connected at PORT ${PORT}`));

