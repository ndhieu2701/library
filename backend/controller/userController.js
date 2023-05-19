import { hashPassword, comparePassword } from "../config/password.js";
import generateToken from "../config/generateToken.js";
import User from "../model/User.js";

//[POST] /user/signin: user signin
const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //check user exist or not
    if (!user) {
      return res
        .status(404)
        .json("User does not exist! Please check your email.");
    }
    //check password is equal with userPassword or not
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(404).json("Password invalid!");
    res.status(200).json({ token: generateToken(user._id), user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[POST] /user/signup: user signup
const userSignup = async (req, res) => {
  try {
    const { username, email, password, dob} = req.body;
    const passwordHash = await hashPassword(password);
    // check username && email is exist or not
    const existUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existUser) {
      if (existUser.email === email) {
        return res.status(404).json("Email exist!");
      }
      if (existUser.username === username) {
        return res.status(404).json("Username exist!");
      }
    }
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
      dob,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { userSignin, userSignup };
