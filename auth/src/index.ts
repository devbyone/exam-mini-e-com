import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from "mongoose";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { profileRouter } from "./routes/profile";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(profileRouter);

app.use(errorHandler);

app.get('*', () => {
    throw new NotFoundError();
});

const start = async () => {
    try {
        await mongoose.connect('mongodb://root:example@localhost:27017/auth-db', {
            authSource: "admin",
            user: "root",
            pass: "example"
        });
        console.log('Contencted to MongoDb.')
    } catch (err) {
        console.log(err);
    }
};

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});

start();