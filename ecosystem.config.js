module.exports = {
  apps: [
    {
      name: "frontend-angular",
      script: "yarn start",
      cwd: "./frontend/angular",
      combine_logs: true,
      log_file: "../../logs/frontend-angular.log",
    },
    {
      name: "backend-cloud-functions",
      script: "yarn start",
      cwd: "./backend/functions",
      combine_logs: true,
      log_file: "../../logs/backend-cloud-functions.log",
      env: {
        GOOGLE_APPLICATION_CREDENTIALS: "./credentials/credentials-dev.json",
      },
    },
  ],
};
