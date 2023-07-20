const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validate = async (req, res, next) => {
  try {
    const  token = req.headers['authorization']

    const verifyToken = jwt.verify(token, process.env.SECRATE);

    const verifiedUser = await User.findById({_id:verifyToken._id})
    console.log(verifiedUser);
    if(!verifiedUser || !verifyToken){
        throw new Error("cant find user")

    }
    req.verifiedUser = verifiedUser;

    next()


  } catch (e) {
    res.status(401).send("un authorise user");
    console.log(e);
  }
};

module.exports = validate