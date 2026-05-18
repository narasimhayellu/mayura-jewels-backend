const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getProfile,
  updateProfile,
  changePassword
} = require(
  "../controllers/profileController"
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.post(
    "/change-password",
    authMiddleware,
    changePassword
  );

module.exports = router;