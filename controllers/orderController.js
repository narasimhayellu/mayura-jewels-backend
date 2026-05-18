const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
    console.log(req.body);
console.log(req.user);

    try {
        const {
            products,
            order_address,
            sub_total,
            shipping_cost,
            tax,
            amount,
            product_qty,
            payment_method,
        } = req.body;

        const invoiceId = `INV-${Date.now()}`;
        console.log(req.body);

        const order = await Order.create({
            user: req.user.id,
            products,
            order_address,
            sub_total,
            shipping_cost,
            tax,
            amount,
            product_qty,
            payment_method,
            invoice_id: invoiceId,

            payment_status:
                payment_method === "cod" ? "pending" : "paid",
        });

        await Cart.deleteMany({ user: req.user.id });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
   console.log("ORDER ERROR:", error);

   res.status(500).json({
      message: "Order creation failed",
      error
   });
}
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
};

exports.createRazorpayOrder = async (req, res) => {
    try {
        const {
            products,
            order_address,
            sub_total,
            shipping_cost,
            tax,
            amount,
            product_qty,
        } = req.body;

        const razorpayOrder = await razorpay.orders.create({
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        const order = await Order.create({
            user: req.user.id,
            products,
            order_address,
            sub_total,
            shipping_cost,
            tax,
            amount,
            product_qty,
            payment_method: "online",
            payment_status: "pending",
            invoice_id: `INV-${Date.now()}`,
        });

        return res.status(200).json({
            success: true,
            razorpay_order_id: razorpayOrder.id,
            local_order_id: order._id,
            key: process.env.RAZORPAY_KEY_ID,
            invoice_id: order.invoice_id,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Razorpay order creation failed",
        });
    }
};

exports.verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            local_order_id,
        } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }

        await Order.findByIdAndUpdate(local_order_id, {
            payment_status: "paid",
            order_status: "confirmed",
        });

        await Cart.deleteMany({ user: req.user.id });

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.order_status === "delivered") {
            return res.status(400).json({
                success: false,
                message: "Delivered order cannot be cancelled",
            });
        }

        if (order.order_status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order already cancelled",
            });
        }

        order.order_status = "cancelled";
        
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Order cancellation failed",
        });
    }
};

exports.getSingleInvoice = async (req, res) => {
    try {
        const order = await Order.findOne({
            invoice_id: req.params.invoice_id,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch invoice",
        });
    }
};