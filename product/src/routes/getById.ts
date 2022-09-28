import express from "express";
import { Product } from "../models/product";

const router = express.Router();

router.get('/api/products/:productId', async (req, res) => {
    const result = await Product.findOne({ _id: req.params.productId });

    if(!result)
        res.status(204).send('Products not found.');

    res.status(200).send(result);
});

export { router as getByIdRouter };