const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["flat_cost", "min_cost"],
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    min_cost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

module.exports = mongoose.model("Shipping", shippingSchema);