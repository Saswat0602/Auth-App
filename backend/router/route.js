const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validate  = require("../middleware/validate")

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("hello from me");
});

//route for register


router.post("/api/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(403).json({ error: "Plese fill up all fields" });
  }

  if (!password || !cpassword) {
    return res.status(401).json({ error: "Passwords are required!" });
  }

  const check = await User.findOne({ email: email });
  if (check) {
    return res.status(401).json({ msg: "user already exist" });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ msg: "user created successsfullly" });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

//route for login

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "field missing" });
  }
  try {
    const findEmail = await User.findOne({ email: email });
    console.log("findEmail", findEmail);

    if (findEmail) {
      const userPass = await bcrypt.compare(password, findEmail.password);
      console.log(userPass);
      //if the passwords match then we will create a token and send it to client side for further
      const userToken = await findEmail.generateToken();

      if (!userToken) {
        return res.status(400).json({ msg: "invalid credentials" });
      } else {
        res
          .status(200)
          .json({ msg: "user loggedin successfully", token: userToken });
      }
    }
  } catch (error) {
    res.status(404).json({ message: " error in login", error: error });
  }
});

//route for homr page

const validate = require("../middleware/validate");
router.post("/api/home", validate ,async (req, res) => {
  const user = req.verifiedUser;
  res.send(user)
});

module.exports = router;
