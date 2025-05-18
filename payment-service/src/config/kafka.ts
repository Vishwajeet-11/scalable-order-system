import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "payment-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"]
});

export const consumer = kafka.consumer({ groupId: "payment-consumers" });
export const producer = kafka.producer();
