import express from "express";
import { PrismaClient } from '@prisma/client'
import {BadRequestError} from "../errors/bad-request-error";
const prisma = new PrismaClient()

const router = express.Router();

router.post('/api/orders', async (req, res) => {
    try{
        const userId = req.user?.id;

        if(!userId)
            throw new BadRequestError('Please singin.');

        //:TODO get from db or product service
        let items = [
            {
                id: 'test',
                quantity: 2,
                price: 50
            },
            {
                id: 'test',
                quantity: 10,
                price: 10
            },
            {
                id: 'test',
                quantity: 1,
                price: 10
            }
        ];

        const grandTotal = items.reduce((a, b) => a + (b.price * b.quantity), 0);

        const result = await prisma.orders.create({
            data: {
                orderNumber: `test1000001${Math.random()}`, //:TODO generate number
                items: items,
                grandTotal: grandTotal,
                status: "PROCESSING",
                createdBy: userId
            }
        });

        res.status(201).send(result);
    }catch(err){
        throw new BadRequestError('Bad Request.');
    }
});

export { router as placeOrderRouter };