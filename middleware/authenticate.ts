import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/model";

interface IUserPayload {
  userId: string;
}

// interface ISecureRequest extends Request {
//   user?: IUserPayload;
// }

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Get the token from the Authorization header
  const cookieString = req.headers.cookie;
  const cookies = cookieString?.split("; ");

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
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as IUserPayload;

    // Find the user in the database
    const user = await User.findById(decoded?.userId);

    // If the user doesn't exist, return a 404 status (Not Found)
    if (!user) {
      res.sendStatus(404);
      return;
    }

    // Attach the user object to the request
    req.user = { userId: user._id.toString() }; //convert ObjectId to String

    // Call the next middleware/controller
    next();
  } catch (err) {
    // If jwt.verify throws an error, return a 403 status (Forbidden)
    console.log(err, "error");
    res.sendStatus(403);
  }
}
