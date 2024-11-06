module.exports = {
    apps: [
        {
            name: 'task-api',
            script: './app.js',
            instances: 2,
            exec_mode: 'cluster',
            watch: true,
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
};