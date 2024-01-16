import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface IToken {
    _id: mongoose.Types.ObjectId;
    iat: number;
    exp: number;
}

export interface ICustomRequestAuth extends Request {
    token?: string | JwtPayload;
    user?: {
        _id: mongoose.Types.ObjectId;
        name: string;
        email: string;
        isAdmin?: boolean | null | undefined;
        isDisabled?: boolean | null | undefined;
        deletedAt: Date | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }
}