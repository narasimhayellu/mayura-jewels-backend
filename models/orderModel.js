const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    invoice_id: {
      type: String,
      unique: true,
    },

    products: [
      {
        product_id: {
          type: String,
          required: true,
        },

        product_name: {
          type: String,
          required: true,
        },

        thumb_image: {
          type: String,
          default: "",
        },

        sku: {
          type: String,
          default: "",
        },

        unit_price: {
          type: Number,
          required: true,
        },

        qty: {
          type: Number,
          required: true,
        },
      },
    ],

    order_address: {
      name: String,

      email: String,

      phone: String,

      address: String,

      city: String,

      state_id: String,

      country_id: String,

      zip: String,

      country: String,
    },

    sub_total: {
      type: Number,
      required: true,
    },

    shipping_cost: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    amount: {
      type: Number,
      required: true,
    },

    product_qty: {
      type: Number,
      required: true,
    },

    payment_method: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },

    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    order_status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
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

module.exports = mongoose.model("Order", orderSchema);
