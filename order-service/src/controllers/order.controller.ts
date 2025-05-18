import { Request, Response } from "express";
import { createOrder } from "../services/order.service";

export const createOrderHandler = async (req: Request, res: Response) => {
    try {
        const order = await createOrder(req.body);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}