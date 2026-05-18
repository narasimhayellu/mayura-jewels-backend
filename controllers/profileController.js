const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password -otp");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      username,
      phone_number,
      gender,
      subscribe,
    } = req.body;

    const updatedUser =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          username,
          phone_number,
          gender,
          subscribe,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password -otp");

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const {
      current_password,
      new_password,
      new_password_confirmation,
    } = req.body;

    if (
      !current_password ||
      !new_password ||
      !new_password_confirmation
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (
      new_password !==
      new_password_confirmation
    ) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await User.findById(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        current_password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(new_password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword
};