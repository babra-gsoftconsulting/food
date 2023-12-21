import { ObjectId } from "mongoose";

export interface UserInterface {
    _id?: ObjectId;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    token?: string;
  }