import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (passwordPlain) {
  return bcrypt.compare(passwordPlain, this.passwordHash);
};

export default mongoose.model("User", UserSchema);

