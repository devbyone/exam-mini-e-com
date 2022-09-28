import express from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";

import {BadRequestError} from "../errors/bad-request-error";

const router = express.Router();

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

router.get('/api/users/profile',  async (req, res) => {
    if(!req.headers.authorization)
        throw new BadRequestError('Authorization not found.');

    try {
        if(!process.env.JWT_SECRET)
            throw new BadRequestError('Something wrong.');

        const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET) as User;
        const { email } = payload;

        const user = await User.findOne({ email: email });
        if(!user)
           return res.status(204).send('User not found.');

        const result = {
            id: user._id,
            email: user.email
        }

        res.send(result);
    } catch (err){
        throw new BadRequestError('Token invalid.');
    }
});

export { router as profileRouter };