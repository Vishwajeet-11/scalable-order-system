import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import orderRouter from "./routes/order.routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", orderRouter);

export default app;



