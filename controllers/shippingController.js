const Shipping = require("../models/shippingModel");

const getShippingRules = async (req, res) => {
  try {
    const rules = await Shipping.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: rules,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch shipping rules",
    });
  }
};

const createShippingRule = async (req, res) => {
  try {
    const { name, type, cost, min_cost } = req.body;

    const rule = await Shipping.create({
      name,
      type,
      cost,
      min_cost,
    });

    res.status(201).json({
      success: true,
      data: rule,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create shipping rule",
    });
  }
};

module.exports = {
  getShippingRules,
  createShippingRule,
};