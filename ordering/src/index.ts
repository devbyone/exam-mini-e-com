import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { placeOrderRouter } from "./routes/createOrder";
import { getOrderById } from "./routes/getById";
import { cancelOrder } from "./routes/cancelOrder";
import { myOrders } from "./routes/myOrders";

import { currentUser } from "./middlewares/current-user";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUser);

app.use(placeOrderRouter);
app.use(getOrderById);
app.use(cancelOrder);
app.use(myOrders);

app.use(errorHandler);

app.get('*', () => {
    throw new NotFoundError();
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});
