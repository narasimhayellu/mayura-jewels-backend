const Wishlist = require("../models/wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    });

    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const addWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({
        message: "Product ID required",
      });
    }

    const existingItem =
      await Wishlist.findOne({
        user: req.user.id,
        product_id,
      });

    if (existingItem) {
      return res.status(400).json({
        message: "Already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      product_id,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const removeWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlist =
      await Wishlist.findById(id);

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    if (
      wishlist.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Wishlist.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Wishlist item removed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getWishlist,
  addWishlist,
  removeWishlist,
};