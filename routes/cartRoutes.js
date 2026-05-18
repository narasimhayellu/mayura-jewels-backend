const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateCart,
  removeCart,
  clearCart,
} = require("../controllers/cartController");

router.get(
  "/",
  authMiddleware,
  getCart
);

router.post(
  "/",
  authMiddleware,
  addToCart
);

router.put(
  "/:id",
  authMiddleware,
  updateCart
);

router.delete(
  "/:id",
  authMiddleware,
  removeCart
);

router.delete(
  "/clear/all",
  authMiddleware,
  clearCart
);

module.exports = router;