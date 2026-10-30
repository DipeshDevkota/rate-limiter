import express from "express";
import { connectRedis, redisClient } from "./redis.js";
import { rateLimiter } from "./rateLimiter.js";
const app = express();
const PORT = 3000;

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({
    message: "Rate limiter API is running",
  });
});

async function startServer(): Promise<void> {
  try {
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await redisClient.quit().catch(() => undefined);
    process.exitCode = 1;
  }
}

void startServer();
