// payment-service/src/consumers/orderCreated.consumer.ts
import { consumer } from "../config/kafka";
import { processPayment } from "../services/payment.service";
import { logger } from "../utils/logger";

export const orderCreatedConsumer = async () => {
  await consumer.connect();
  logger.info("Kafka consumer connected in payment-service");

  await consumer.subscribe({
    topic: process.env.KAFKA_ORDER_TOPIC!,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const orderData = JSON.parse(message.value!.toString());
      logger.info(`Consumed order event: ${orderData.id}`);
      await processPayment(orderData);
    },
  });
};
