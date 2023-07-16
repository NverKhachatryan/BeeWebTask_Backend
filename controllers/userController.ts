import { Request, Response } from "express";
import { User } from "../models/model";
import jwt from "jsonwebtoken";
const cookie = require("cookie");

export async function signup(req: Request, res: Response) {
  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    const record = await user.save();
    console.log("User saved");
    res.status(200).send("User saved");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup");
  }
}

export async function login(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET as string);
  
      res.cookie('token', token, {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
      })
      .status(200)
      .json({ fullName: user.fullName, email: user.email });
    }} catch (error: any) {
      res.status(500).json({ success: false, message: error?.message });
    }
  }
