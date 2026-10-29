import type { Request, Response,NextFunction } from "express";
import { redisClient } from "./redis.js";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 10;

export async function rateLimiter (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void>{
    try {
        
        const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
        const key = `rate-limit:${ip}`;

        const count = await redisClient.incr(key);
        if(count === 1)
        {
            await redisClient.expire(key,WINDOW_SECONDS);
        }
    } catch (error) {
        
    }
}