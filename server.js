const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

const app = express();

connectDb();

app.use(
    cors({
      origin: ["http://localhost:3000",
        "https://mayura-jewels.netlify.app"
      ],
      credentials: true,
    })
  );
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use(
    "/api/frontend",
    require("./routes/contactRoutes")
);

app.use(
    "/api/backend",
    require("./routes/profileRoutes")
);

app.use(
    "/api/backend",
    require("./routes/addressRoutes")
);

app.use("/api/backend",
    require("./routes/orderRoutes")
);

app.use(
    "/api/backend/wishlists",
    require("./routes/wishlistRoutes")
);

app.use(
    "/api/backend/cart",
    require("./routes/cartRoutes")
);

app.use(
    "/api/frontend",
    require("./routes/shippingRoutes")
);

app.use("/api",require("./routes/bannerRoutes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});