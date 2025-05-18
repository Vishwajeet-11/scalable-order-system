import dotenv from "dotenv";
import { kafka } from "../config/kafka";
import { logger } from "../utils/logger";

dotenv.config();

const consumer = kafka.consumer({groupId: "order-group"});

export const runOrderWorker = async() => {
    await consumer.connect();
    await consumer.subscribe({topic: process.env.KAFKA_ORDER_TOPIC!, fromBeginning: false});

    await consumer.run({
        eachMessage: async({topic, partition, message}) => {
            logger.info(`📦 Order worker: Received order`);
        }
    })
    logger.info("🔥Order worker is running")
}