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



### use this postman link to access the apis

- https://api.postman.com/collections/25224695-7686c1f8-d824-4061-85b0-f8eca0e5e01f?access_key=PMAT-01GPBCJB3CNF6G26VNNDKZ0JNA

- API documentation

- https://documenter.postman.com/preview/25224695-fe397d95-b22b-427f-aa84-b8d35a407ae0?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&right-sidebar=303030&top-bar=FFFFFF&highlight=EF5B25