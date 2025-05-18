import { Router } from "express";
import { createOrderHandler } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/orders", createOrderHandler);

export default orderRouter;
