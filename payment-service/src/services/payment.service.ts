// payment-service/src/services/payment.service.ts
import { PrismaClient } from "@prisma/client";
import { producer } from "../config/kafka";
import { logger } from "../utils/logger";

const prisma = new PrismaClient();

export const processPayment = async (order: {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}) => {
  logger.info(`Processing payment for Order ${order.id}...`);

  // Simulate successful payment (you can expand this later)
  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      userId: order.userId,
      amount: order.quantity * 100, // mock calculation
      status: "completed",
    },
  });

  // Send payment_completed event
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_PAYMENT_TOPIC!,
    messages: [
      {
        key: payment.id,
        value: JSON.stringify(payment),
      },
    ],
  });

  logger.info(`✅ Payment completed and event emitted for Payment ${payment.id}`);

  return payment;
};
