import express from "express";
import { User } from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { Password } from "../utilities/password";

const router = express.Router();

router.post('/api/users/signin', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser)
        throw new BadRequestError('User not found.');

    const passwordsMatch = await Password.compare(
        existingUser.password,
        password
    );

    if (!passwordsMatch)
        throw new BadRequestError('Wrong Password.');

    if(!process.env.JWT_SECRET)
        throw new BadRequestError('Something wrong.');

    const userJwt = jwt.sign({ id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET);

    res.status(201).send({ id: existingUser._id, accessToken: userJwt });
});

export { router as signinRouter };