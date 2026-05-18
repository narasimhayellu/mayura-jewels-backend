const Cart = require("../models/cartModel");

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user_id: req.user.id,
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);
    const {
        product_id,
        product_name,
        price,
        thumb_image,
        quantity,
        product_sku,
      } = req.body;

    const existingItem = await Cart.findOne({
      user_id: req.user.id,
      product_id,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;

      await existingItem.save();

      return res.status(200).json({
        message: "Cart updated",
        cart: existingItem,
      });
    }

    const cartItem = await Cart.create({
        user_id: req.user.id,
        product_id,
        product_name,
        price,
        thumb_image,
        quantity: quantity || 1,
        product_sku,
      });

    res.status(201).json({
      message: "Added to cart",
      cart: cartItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add cart",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      message: "Quantity updated",
      cart: cartItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update cart",
    });
  }
};

const removeCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(
      req.params.id
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to remove cart item",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user_id: req.user.id,
    });

    res.status(200).json({
      message: "Cart cleared",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to clear cart",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeCart,
  clearCart,
};