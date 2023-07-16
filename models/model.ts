import mongoose from "mongoose";

const bcrypt = require("bcrypt");
require("dotenv").config();

interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IWorkspace extends mongoose.Document {
  userId: string;
  name: string;
  slug: string;
}

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const WorkspaceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

UserSchema.pre<IUser>("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUser;
  return bcrypt
    .compare(candidatePassword, user.password)
    .then((isMatch: boolean) => {
      if (!isMatch) {
        return false;
      }
      return true;
    });
};

const User = mongoose.model<IUser>("User", UserSchema);
const Workspace = mongoose.model("Workspace", WorkspaceSchema);

export { IUser, IWorkspace, User, Workspace };
