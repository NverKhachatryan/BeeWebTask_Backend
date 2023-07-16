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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../models/model");
// interface ISecureRequest extends Request {
//   user?: IUserPayload;
// }
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the token from the Authorization header
        const cookieString = req.headers.cookie;
        const cookies = cookieString === null || cookieString === void 0 ? void 0 : cookieString.split("; ");
        let token = null;
        if (cookies) {
            for (const cookie of cookies) {
                const [name, value] = cookie.split("=");
                if (name.trim() === "token") {
                    token = value;
                    break;
                }
            }
        }
        // If there's no token, return a 401 status (Unauthorized)
        if (!token) {
            res.sendStatus(401);
            return;
        }
        try {
            // Verify the token. If it's not valid, jwt.verify will throw an error
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // Find the user in the database
            const user = yield model_1.User.findById(decoded === null || decoded === void 0 ? void 0 : decoded.userId);
            // If the user doesn't exist, return a 404 status (Not Found)
            if (!user) {
                res.sendStatus(404);
                return;
            }
            // Attach the user object to the request
            req.user = { userId: user._id.toString() }; //convert ObjectId to String
            // Call the next middleware/controller
            next();
        }
        catch (err) {
            // If jwt.verify throws an error, return a 403 status (Forbidden)
            console.log(err, "error");
            res.sendStatus(403);
        }
    });
}
exports.authenticateToken = authenticateToken;
