module.exports = {
  apps: [
    {
      name: 'market-backend',
      script: './build/src/index.js',
      instances: '1',
      exec_mode: 'fork',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
