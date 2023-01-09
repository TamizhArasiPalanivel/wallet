import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json" assert { type: 'json' };
import BootstrapApp from "./system/bootstrap.js";
import RoutesConfig from "./routes/index.js";

dotenv.config();

const app = express();

// Bootstrap Application
new BootstrapApp(app);

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// get __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/public/", express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(bodyParser.json({ limit: "2mb" }));

app.use(bodyParser.json());
app.use(
    bodyParser.text({
        type: "text/xml",
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
const ALLOWED_ORIGINS = process.env["Platform_ALLOWED_ORIGINS"].split(",");
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
                var msg = "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

app.use(function (req, res, next) {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Access-Control-Allow-Headers", process.env["Platform_ALLOWED_HEADERS"]);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
});

app.use(clientErrorHandler);

// eslint-disable-next-line no-unused-vars
function clientErrorHandler(err, req, res, next) {
    res.status(500).send({
        error: "Unable to Process the request",
    });
    appLogger.error("Uncaught Exception In Global Handler", err);
}

process.on("uncaughtException", (err, req) => {
    if (err && err.message !== "TEST") {
        appLogger.error("whoops! There was an uncaught error", err);
    }
    // do a graceful shutdown,
    // close the database connection etc.
});

process.on("unhandledRejection", function (reason, promise, req) {
    appLogger.error("Unhandled rejection request", req);
    appLogger.error("Unhandled rejection reason", reason);
    appLogger.error("Unhandled rejection promise", promise);
});

//route configs
RoutesConfig(app);

//display all routes
let routes = [];

app._router.stack.forEach(function (middleware) {
    if (middleware.route) {
        // routes registered directly on the app
        routes.push(middleware.route);
    } else if (middleware.name === "router") {
        // router middleware
        middleware.handle.stack.forEach(function (handler) {
            let route = handler.route;
            route && routes.push(route);
        });
    }
});

routes.forEach(function (temp) {
    const methods = Object.keys(temp.methods).map((key) => temp.methods[key] && key.toUpperCase());
    console.log(methods.join(",") + " : " + temp.path);
});

export default app;
