

const Banner = require("../models/bannerModel");

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getSingleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const addBanner = async (req, res) => {
    try {
      const banner = await Banner.create({
        title: req.body.title,
        image: req.body.image,
        status: true,
      });
  
      res.status(201).json({
        success: true,
        banner,
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        message: "Server Error",
      });
    }
  };

const createBanner = async (req, res) => {
  try {
    const { title, status } = req.body;

    const banner = await Banner.create({
      title,
      status,
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, status } = req.body;

    const banner = banners.find(
        (item) => item.id === parseInt(id)
      );

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    banner.title = title || banner.title;

    banner.status =
      status !== undefined ? status : banner.status;

    if (req.file) {
      banner.image = req.file.path;
    }

    res.status(200).json({
      success: true,
      banner,
      message: "Banner updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    await banner.deleteOne();

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getBanners,
  getSingleBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  addBanner
};