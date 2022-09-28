import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../errors/bad-request-error";

interface User {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization)
        throw new BadRequestError('Unauthorized.');

    try {
        if (!process.env.JWT_SECRET)
            throw new BadRequestError('Something wrong.');

        const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as User;
        req.user = payload;

        next();
    } catch (err) {
        throw new BadRequestError('Unauthorized.');
    }
};
