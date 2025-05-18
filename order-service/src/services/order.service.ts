import { PrismaClient } from "@prisma/client";
import { producer } from "../config/kafka";
import { logger } from "../utils/logger";


const prisma = new PrismaClient();

export const createOrder = async (orderData: { userId: string, productId: string, quantity: number }) => {
    const order = await prisma.order.create({ data: orderData });
    await producer.connect();
    await producer.send({
        topic: process.env.KAFKA_ORDER_TOPIC!,
        messages: [
            {
                key: order.id,
                value: JSON.stringify(order)
            }
        ]
    })
    logger.info(`Order ${order.id} created and event published`);
    return order;
}