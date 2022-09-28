import express, {Request, Response} from "express";
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Product } from "../models/product";
import {RequestValidationError} from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post('/api/products',[
    body('name')
        .isString()
        .withMessage('Invalid product name.'),
    body('price')
        .isNumeric()
        .withMessage('Invalid price.'),
    body('inStock')
        .isNumeric()
        .withMessage('Invalid inStock.'),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        throw new RequestValidationError(errors.array());

    const { name, cost, price, inStock } = req.body;
    const product = new Product({
        name: name,
        cost: cost,
        price: price,
        inStock: inStock }
    );

    await product.save();

    res.status(201).send({ id: product._id });
});

export { router as createProductRouter };