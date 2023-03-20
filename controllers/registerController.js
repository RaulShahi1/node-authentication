const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.registerUsers = async (req, res, next) => {
  try {
    //Get user input
    const { firstName, lastName, email, password } = req.body;

    //Validate user input

    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All the inputs are required.");
    }

    //checking if user already exists
    //validate if user exist in our database
    const isOldUser = await User.findOne({ email });
    if (isOldUser) {
      return res
        .status(409)
        .send(
          "User already exists. Please login or use another email to register."
        );
    }

    //encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    //create user in database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //create token

    const token = jwt.sign({ user_id: user._id, email }, "bobtoken", {
      expiresIn: "2h",
    });
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
