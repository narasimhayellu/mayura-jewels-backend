const Address = require("../models/addressModel");

const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingAddresses = await Address.countDocuments({
      user: userId,
    });

    if (existingAddresses >= 4) {
      return res.status(400).json({
        message: "Maximum 4 addresses allowed",
      });
    }

    const address = await Address.create({
      ...req.body,
      user: userId,
    });

    res.status(201).json({
      success: true,
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAddresses = async (
  req,
  res
) => {
  try {
    const addresses =
      await Address.find({
        user: req.user.id,
      });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteAddress = async (
  req,
  res
) => {
  try {
    const address =
      await Address.findById(
        req.params.id
      );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    await Address.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  deleteAddress,
};