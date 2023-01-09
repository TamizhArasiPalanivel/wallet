import mongoose from "mongoose";

export default class dbConnection {
    constructor() {
        // mongodb connection
        this.createMongoConnection();
    }
    createMongoConnection() {
        this.connect();
        const db = mongoose.connection;
        const reconnectTimeout = parseInt(process.env["DB_RECONNECT_TIMEOUT"]);
        db.on("connecting", () => {
            console.info("Connecting to MongoDB...");
        });

        db.on("error", (error) => {
            appLogger.error(`MongoDB connection error: ${error}`);
            mongoose.disconnect();
        });

        db.on("connected", () => {
            console.info("Connected to MongoDB!");
            const admin = new mongoose.mongo.Admin(mongoose.connection.db);
            admin.buildInfo((err, info) => {
                if (err) {
                    console.log("Could not connect to the database", err);
                }
                console.log("Database version", info ? info.version : "_");
            });
        });

        db.once("open", () => {
            console.info("MongoDB connection opened!");
        });

        db.on("reconnected", () => {
            console.info("MongoDB reconnected!");
        });

        db.on("disconnected", () => {
            appLogger.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
            setTimeout(() => this.connect(), reconnectTimeout);
        });
    }
    connect() {
        mongoose
            .connect(process.env["DB_URL"], {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                minPoolSize: parseInt(process.env["MIN_POOL_SIZE"]),
                maxPoolSize: parseInt(process.env["MAX_POOL_SIZE"])
            })
            .catch((error) => {
                appLogger.error("Could not connect to the database", error);
                appLogger.error(error);
            });
    }
}
