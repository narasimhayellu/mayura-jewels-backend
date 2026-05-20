const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    id: {
        type: Number,
        required: true,
        unique: true,
      },
      
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);