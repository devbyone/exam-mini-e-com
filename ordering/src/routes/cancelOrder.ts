import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import moment from 'moment';

const router = express.Router();

router.patch('/api/orders/:orderId/cancel', async (req, res) => {
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id: req.params.orderId
            }
        });

        if (!order)
            res.status(400).send('Order not found.');

        if (order?.status != "PROCESSING")
            res.status(400).send('Order status must be PROCESSING.');

        const result = await prisma.orders.update({
            where: {
                id: req.params.orderId
            },
            data: {
                status: "CANCELLED",
                updatedAt: moment().format(),
                updatedBy: "test"
            }
        });

        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

export { router as cancelOrder };