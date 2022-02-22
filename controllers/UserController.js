const bcrypt = require("bcryptjs");
const User = require("../models/User");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }

  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      message: "Successfully created user",
    });
  } else {
    return res.status(400).json({ errors: [{ msg: "Invalid user data" }] });
  }
};

module.exports = { registerUser };
