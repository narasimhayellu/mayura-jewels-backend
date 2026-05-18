const express = require("express");

const router = express.Router();

const {
  createContactMessage,
} = require("../controllers/contactController");

router.post(
  "/contact-messages",
  createContactMessage
);

module.exports = router;