const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  getBanners,
  getSingleBanner,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

router.get("/banners", getBanners);

router.get("/banners/:id", getSingleBanner);



router.post(
  "/banners",
  upload.single("image"),
  createBanner
);

router.put(
  "/banners/:id",
  upload.single("image"),
  updateBanner
);

router.delete("/banners/:id", deleteBanner);

module.exports = router;