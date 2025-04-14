import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already Exist.",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not registered.",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    await user.save();
    var transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      // to: user.email,
      to: "amreshchaurasiya219@gmail.com",
      subject: "Mail Subject",
      text: `Please Click on the following link: ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
    };
    await transport.sendMail(mailOption);

    res.status(200).json({
      message: "User Registered Successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered",
      error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).json({
      message: "Invalid Token",
    });
  }
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({
      message: "Invalid Token",
    });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }
  try {
    const user = await User.findOne(email);
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {}
};

const getMe = async (req, res) => {
  try {
    const user = User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {}
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      expiresIn: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {}
};

const forgotPassword = async (req, res) => {
  try {
    //get email
    //find user based on email
    //reset token + reset expiry => Date.now() + 10*60*1000 => usre.save()
    //send mail => design url
  } catch (error) {}
};

const resetPassword = async (req, res) => {
  try {
    //collect token from params
    //password from req.body
    //
    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        //$gt greater than
        resetPasswordExpiry: { $gt: Date.now() },
        //set password in user
        //resetToken, resetExpiry => reset
        //save
      });
    } catch (error) {}
  } catch (error) {}
};

export {
  registerUser,
  verifyUser,
  loginUser,
  getMe,
  logoutUser,
  forgotPassword,
  resetPassword,
};
