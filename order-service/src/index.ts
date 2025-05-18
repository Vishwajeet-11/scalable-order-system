import app from "./app";
import { logger } from "./utils/logger";
import { runOrderWorker } from "./workers/order.worker";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`🔥server started at port ${PORT}`);
    runOrderWorker();
})