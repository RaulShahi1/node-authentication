const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postUserLogin = async (req, res, next) => {
  //logic for login
  try {
    // acquiring input data
    const { email, password } = req.body;

    // validating user inputs
    if (!(email && password)) {
      return res.status(400).send("All inputs are required.");
    }

    //validating if user exists in database

    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      //create token
      const token = jwt.sign({ user_id: user._id, email }, "bob", {
        expiresIn: "2h",
      });

      //save user token
      user.token = token;

      //user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials.");
  } catch (err) {
    console.log(err);
  }
};
