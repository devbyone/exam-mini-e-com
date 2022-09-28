import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router();

router.get('/api/orders/:orderId', async (req, res) => {
        const result = await prisma.orders.findUnique({
            where: {
                id: req.params.orderId
            }
        });

        if(!result)
            res.status(204).send('Order not found.');

        res.status(200).send(result);
});

export { router as getOrderById };