const fs = require('fs');
const config = require('./config');
const { createClient } = require('redis');

async function task(userId) {
    const logEntry = `${userId}-task completed at-${Date.now()}
`;
    fs.appendFileSync(config.logFile, logEntry);
}

async function processTaskQueue(userId, redisClient) {
    const taskKey = `tasks:${userId}`;
    let interval = setInterval(async () => {
        const task = await redisClient.lPop(taskKey);

        if (task) {
            await task(userId);
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

async function addTaskToQueue(userId, redisClient) {
    const taskKey = `tasks:${userId}`;
    const timeKey = `times:${userId}`;

    const taskCount = await redisClient.lLen(taskKey);
    const timestamps = await redisClient.lRange(timeKey, 0, -1);
    
    if (taskCount < config.rateLimit.maxPerMinute && timestamps.length < config.rateLimit.maxPerSecond) {
        await redisClient.rPush(taskKey, userId);
        await redisClient.rPush(timeKey, Date.now());
        redisClient.lTrim(timeKey, -config.rateLimit.maxPerMinute, -1);
        processTaskQueue(userId, redisClient);
    }
}

module.exports = { addTaskToQueue };