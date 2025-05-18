// payment-service/src/index.ts
import { consumer } from "./config/kafka";
import { orderCreatedConsumer } from "./consumers/orderCreated.consumer";
import { processPayment } from "./services/payment.service";
import { logger } from "./utils/logger";

const run = async () => {
  await consumer.connect();
  logger.info("Kafka consumer connected");

  await consumer.subscribe({ topic: process.env.KAFKA_ORDER_TOPIC!, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const orderData = JSON.parse(message.value!.toString());
      logger.info(`Received order event: ${orderData.id}`);
      await processPayment(orderData);
    },
  });
};

run().catch((err) => {
  logger.error("Kafka consumer error: " + err.message);
});

orderCreatedConsumer().catch((err) => {
  console.error("❌ Failed to start orderCreatedConsumer", err);
});