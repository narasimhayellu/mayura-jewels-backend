const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    country_id: {
      type: Number,
      required: true,
    },

    state_id: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    zip: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    is_default: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "address",
  addressSchema
);