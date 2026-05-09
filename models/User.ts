import mongoose, { Schema, model } from "mongoose";

export const USER_ROLES = ["user", "admin", "superadmin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  name?: string;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: USER_ROLES,
      default: "user",
    },
    name: { type: String, trim: true },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

// Next.js can keep a stale compiled model across HMR; strict mode then drops new paths on save.
if (process.env.NODE_ENV !== "production" && mongoose.models.User) {
  delete mongoose.models.User;
}

export default model<IUser>("User", UserSchema);
