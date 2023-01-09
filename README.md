# Wallet APIs

## Version

-   1.0.0

## System Requirements for application

-   MongoDB - 5.0.14 ## development db version
-   RAM - Defalut 1 GB

### To run with pm2

-   pm2 start npm --name 'app name' -- start

## Environment Configuration (.env)

-   **NODE_ENV**: It represents the environment we are running the project, default value is production
-   **DB_URL**: MongoDB URI
-   **DB_RECONNECT_TIMEOUT**: MongoDB reconnection time
-   **MIN_POOL_SIZE**: MongoDB minimum pool connction
-   **MAX_POOL_SIZE**: MongoDB maximum pool connction

### Platform configurations (.env)
-   **PLATFORM_PORT**: Port on which the application should run
-   **Platform_ALLOWED_ORIGINS**: List of allowed origins to access APIs
-   **Platform_ALLOWED_HEADERS**: Allowed request headers for the APIs

### Logs configs (.env)
-   **LOG_LEVEL**: To enable logs based on hierarychy and it uses this pattern "DEBUG/INFO/ERROR/CRITICAL". If the log level is "DEBUG" then all logs will be logged. If "INFO" then "INFO, ERROR and CRITICAL" logs will be logged. If "ERROR" then "ERROR and CRITICAL" logs will be logged. If "CRITICAL" only "CRITICAL" logs will be logged.
-   **ENABLE_CONSOLE_LOGS**: Enable console logs
-   **ENABLE_FILE_LOGS**: Enable file logs
-   **ENABLE_ELK_LOGS**: Enable ELK logs
-   **ELK_USERNAME**: ELK user name
-   **ELK_PASSWORD**: ELK password
-   **ELK_FLUSH_INTERVAL**: ELK logs flush interval
-   **ELK_URL**: ELK url
-   **ELK_INDEX_NAME**: ELK index name created for Wallet api services

### Wallet Number Sequence
-   **WALLET_START_NUM**: "50000"
