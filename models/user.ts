/**
 * Created by asmitty on 3/16/17.
 */
import mongoose, {Schema, Document} from 'mongoose';

export const userSchema = new Schema<UserDocument>({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    createdAt: {type: Date, default: Date.now},
    lastLoginAt: Date,
    lastLogoutAt: Date
});

export interface User {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    createdAt?: Date;
    lastLoginAt?: Date;
    lastLogoutAt?: Date;
}

export interface UserDocument extends User, Document {}

export const userModel = mongoose.model("User", userSchema, "Users");
export const chatUserModel = mongoose.model("ChatUser", userSchema, "ChatUsers");
export const PendingUserModel = mongoose.model("PendingUser", userSchema, "PendingUsers");