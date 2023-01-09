
import http from "http";
import https from "https";
import fs from "fs";
import SystemLogger from "../system/elkLogger.js";
import hook from "./providers/systemLogger/logger.middleware.js";
import dbConnection from "./dbConnection.js"
import loggerConfig from "../config/loggerConfig.json" assert { type: 'json' };


export default class BootstrapApp {
    constructor(app) {
        this.initializeConfig();
        this.port = this.normalizePort(process.env["Platform_PORT"]);
        this.server = http.createServer(app);
        this.server.listen(this.port);
        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);
        this.initializeLogger();
        this.vgLoggerInitialize(app);
        this.createDBConnection();
    }

    /**
     * Loads and hooks DB Logger Module
     * @param {app Reference} app
     */

    vgLoggerInitialize(app) {
        try {
            if (loggerConfig.logger_config.vg_logger.request == true && loggerConfig.logger_config.vg_logger.response == false) {
                console.log("Logger Req");
                app.use("/", hook.reqLogger);
            } else if (loggerConfig.logger_config.vg_logger.response == true && loggerConfig.logger_config.vg_logger.request == false) {
                app.use("/", hook.resLogger);
            } else {
                app.use("/", [hook.reqLogger, hook.resLogger]);
            }
        } catch (err) {
            console.error("Error in Bootsrtaping VG Logger", err);
            process.exit(0);
        }
    }

    /**
     * Initialize System Config, Exit Node Application Bootstrap in case of error
     */
    initializeConfig() {
        try {
            process.on("SIGINT", () => {
                console.log("API Application is shutting down..");
                // some other closing procedures go here
                process.exit(1);
            });
        } catch (err) {
            console.log(err);
            console.error("System Congif File Missing");
            process.exit(0);
        }
    }

    /**
     * Initialize Logger and assign it for gloabl access
     */

    initializeLogger() {
        global.appLogger = new SystemLogger();
    }

    /**
     * create DB Connection
     */

    createDBConnection() {
        try {
            new dbConnection();
        } catch (error) {
            appLogger.error(null, null, 'whoops! There is an issue with connecting DB', error);
            process.exit(0);
        }
    }


    /**
     * Returns Port and Server used in HTTP server setup
     * @param {}
     */

    getHttpServerDetail() {
        return {
            port: this.port,
            server: this.server
        };
    }

    /**
     *  Noemalize Port Value
     * @param { Port Number} val
     */
    normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }

        console.error("Invalid Port", val);
        process.exit();
    }

    /**
     *  Handle Error on HTTP server
     * @param { Error object from HTTP Server Module} error
     */
    onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }

        let bind = typeof this.port === "string" ? `Pipe ${this.port}` : `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     *
     */

    onListening() {
        let addr = this.address();
        let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

        console.log(`API App is listening on ${bind}`);
        console.log("Use (Ctrl-C) to shutdown the application..");
    }

}

//module.exports = BootstrapApp;
