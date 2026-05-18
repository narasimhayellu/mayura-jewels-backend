const express = require("express");

const router = express.Router();

const {
  getShippingRules,
  createShippingRule,
} = require("../controllers/shippingController");

router.get(
  "/shipping-rules",
  getShippingRules
);

router.post(
  "/shipping-rules",
  createShippingRule
);

module.exports = router;