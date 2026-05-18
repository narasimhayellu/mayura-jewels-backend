const express = require("express");
const router = express.Router();

const {createOrder,getMyOrders,createRazorpayOrder,verifyRazorpayPayment, cancelOrder, getSingleInvoice} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/orders", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, getMyOrders);

router.post("/payments/razorpay", authMiddleware, createRazorpayOrder);

router.post("/payments/razorpay/verify",authMiddleware,verifyRazorpayPayment);

router.post("/orders/:id/cancel",authMiddleware,cancelOrder);

router.get("/my-orders/:invoice_id",authMiddleware,getSingleInvoice);

module.exports = router;