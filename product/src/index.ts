import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from "mongoose";

import { createProductRouter } from "./routes/create";
import { getByIdRouter } from "./routes/getById";
import {getByIdsRouter} from "./routes/search";
import { getAllRouter } from "./routes/getAll";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(createProductRouter);
app.use(getByIdRouter);
app.use(getByIdsRouter);
app.use(getAllRouter);

app.use(errorHandler);

app.get('*', () => {
    throw new NotFoundError();
});

const start = async () => {
    try {

        await mongoose.connect('mongodb://localhost:27017/product-db', {
            authSource: "admin",
            user: "root",
            pass: "example"});
        console.log('Contencted to MongoDb.')
    } catch (err) {
        console.log(err);
    }
};

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});

start();