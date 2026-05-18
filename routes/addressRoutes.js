const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createAddress,
  getAddresses,
  deleteAddress,
} = require(
  "../controllers/addressController"
);

router.post(
  "/user-addresses",
  authMiddleware,
  createAddress
);

router.get(
  "/user-addresses",
  authMiddleware,
  getAddresses
);

router.delete(
  "/user-addresses/:id",
  authMiddleware,
  deleteAddress
);

module.exports = router;