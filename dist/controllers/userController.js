"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const model_1 = require("../models/model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie = require("cookie");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new model_1.User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
            });
            const record = yield user.save();
            console.log("User saved");
            res.status(200).send("User saved");
        }
        catch (error) {
            console.error("Error during signup:", error);
            res.status(500).send("Error during signup");
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = yield model_1.User.findOne({ email });
            if (user && (yield user.comparePassword(password))) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
                res.cookie('token', token, {
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict'
                })
                    .status(200)
                    .json({ fullName: user.fullName, email: user.email });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.login = login;
