module.exports = {
    rateLimit: {
        maxPerSecond: 1,
        maxPerMinute: 20,
    },
    redisConfig: {
        host: '127.0.0.1',
        port: 6379,
    },
    logFile: './logs/task.log'
};