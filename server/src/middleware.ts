import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "./Utils/ApiError";
import env from "./endpoints.config";

export const userMiddleware = (req:Request,res:Response,next: NextFunction) =>{
    const header = req.headers['authorization'];
    
    if (!header) {
        throw new ApiError(401, "Unauthorized request")
    }
    const decoded = jwt.verify(header as string,env.JWT_SECRET);
    
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userId = (decoded as JwtPayload)._id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}