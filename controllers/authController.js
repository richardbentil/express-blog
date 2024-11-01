const USER = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    //check if user with email already exist
    const userresponse = await USER.findOne({ email });
    if (userresponse) return res.status(400).send({ message: "User with email already exist" });
    
    //generate hash password
    const hashedPassword = await generateHashPassword(password);

    const user = new USER({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await USER.findOne({ email });
    if (!findUser) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid password" });

    const user = {
      _id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      role: findUser.role,
    }
  
    const token = generateToken(user);

    //save token in cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(200).send({ user, token });
  } catch (error) {
    next(error);
  }
};

const generateHashPassword = async(password) => {
  //generate salt rounds
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
}

const generateToken = (user) => {
    //takes in payload, a secret key, and expiration in hrs or day
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { register, login };
