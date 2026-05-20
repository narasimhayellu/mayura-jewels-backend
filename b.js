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

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());



// const PORT = process.env.PORT || 8000 
// app.listen(PORT,()=>console.log(`server connected at PORT ${PORT}`));

const getBanner = async(req,res)=>{
    try {
        const banners = [
            {
              image:
                "https://i.ytimg.com/vi/3x6x9eXmj3U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDokbTFAVwb9lituX8sSZ4D2wOQwg",
              title:"Necklace",
              id:1  
            },
            {
              image:
                "https://www.londongold.com/media/uploads/Lab%20Grown%20Certs/Tennis-lab_banner.jpg",
                title:"Bangles",
                id:2  
            },
            {
              image:
                "https://images.bhimagold.com/admin/category/images/1778164361203-earrings-1200x600.jpg",
                title:"Earrings",
                id:3  
            },
          ];

        res.status(200).json({
          success: true,
          banners,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
          message: "Server Error",
        });
    }
}



module.exports = {getBanner};