import express from "express";
import { Product } from "../models/product";

const router = express.Router();

router.post('/api/products/search', async (req, res) => {
    const result = await Product.find({ _id: { $in: req.body.ids } });

    if(!result)
        res.status(204).send('Products not found.');

    res.status(200).send(result);
});

export { router as getByIdsRouter };