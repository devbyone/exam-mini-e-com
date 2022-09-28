import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = express.Router();

router.get('/api/orders/my-orders', async (req, res) => {
        const userId = req.user?.id;

        const result = await prisma.orders.findMany({
            where: {
                createdBy: userId
            }
        });

        if(!result)
            res.status(204).send('Orders not found.');

        res.status(200).send(result);
});

export { router as myOrders };