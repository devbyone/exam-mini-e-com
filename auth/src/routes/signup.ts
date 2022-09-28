import express, {Request, Response} from "express";
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../utilities/password";

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Invalid email address.'),
    body('password')
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8 and 20 characters')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        throw new RequestValidationError(errors.array());

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email already exist.');
    }

    const passwordHashed = await Password.toHash(password);

    const user = new User({
        email: email,
        password: passwordHashed
    });

    await user.save();

    if(!process.env.JWT_SECRET)
        throw new BadRequestError('Something wrong.');

    const userJwt = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    res.status(201).send({ id: user._id, accessToken: userJwt });
});

export { router as signupRouter };