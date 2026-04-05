import mongoose, { Schema, model, models } from "mongoose";

export const USER_ROLES = ["user", "superadmin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  name?: string;
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
  },
  { timestamps: true },
);

const User = models.User ?? model<IUser>("User", UserSchema);

export default User;
