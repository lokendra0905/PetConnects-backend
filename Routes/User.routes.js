const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.Model");

userRouter.get("/", async (req, res) => {
  const users = await UserModel.find({});
  try {
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(400).send({ error });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User Already Exist Cannot Register" });
    }

    const hashed = await bcrypt.hash(password, 5);

    const User = new UserModel({
      name,
      email,
      password: hashed,
    });

    await User.save();

    return res
      .status(200)
      .json({ message: "The new user has been registered" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.msg });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User Not Found Please Register" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, user: user.name },
          "lokendra",
          { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
          { userID: user._id, user: user.name },
          "lokendra",
          { expiresIn: "1d" }
        );

        return res
          .status(200)
          .json({ message: "Login Successful", token, refreshToken });
      } else {
        return res.status(400).json({ message: "Wrong Crediential" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = {
  userRouter,
};
