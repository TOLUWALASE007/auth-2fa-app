import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  twoFactorEnabled: boolean;
  twoFactorCode?: string;
  twoFactorExpires?: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorCode: { type: String },
  twoFactorExpires: { type: Date },
});

const User = models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
