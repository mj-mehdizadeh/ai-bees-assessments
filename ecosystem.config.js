module.exports = {
  apps: [
    {
      name: 'ai-bees-assessment',
      script: './dist/main.js',
      instances: process.env.INSTANCES || 16,
      log_date_format: 'DD-MM HH:mm:ss.SSS',
      max_memory_restart: '350M',
    },
  ],
};
