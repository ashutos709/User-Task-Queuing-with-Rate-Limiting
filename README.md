# Node.js Task Queuing with Rate Limiting

## Project Overview

This project provides a Node.js API to queue user-specific tasks with rate limiting, using Redis and PM2 for efficient clustering and task management.

## Setup

### Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

### Start Redis Server
Ensure that Redis is running locally. You can install and start Redis with:
```bash
redis-server
```

### Running the Application

1. **Start in Single Instance Mode**:
   ```bash
   npm start
   ```

2. **Start in Cluster Mode**:
   Using PM2, start the application in cluster mode:
   ```bash
   npm run start:cluster
   ```

## API Documentation

### Endpoint
- **POST** `/api/v1/tasks/`
  - **Body**: `{ "user_id": "123" }`
  - **Response**: `{ "message": "Task added to queue" }`

### Rate Limits
- Each user ID is limited to:
  - 1 task per second
  - 20 tasks per minute

Requests exceeding the rate limit are queued and executed once the rate limit allows.

## Logs
Task completions are logged in `logs/task.log`.

## Testing
Use Postman or any REST client to test the API by sending requests to `http://localhost:3000/api/v1/tasks/`.