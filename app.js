const express = require('express');
const { createClient } = require('redis');
const taskQueue = require('./taskQueue');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

const redisClient = createClient();
redisClient.connect().catch(console.error);

app.use('/api/v1/tasks', taskRoutes(redisClient, taskQueue));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});