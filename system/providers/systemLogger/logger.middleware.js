import uuid from "uuid/v4.js";

async function requestLogger(req, res, next) {
    req.trans_log_id = uuid();
    return next();
}

async function responseLogger(req, res, next) {
    try {
        res.done = async function done(data, message) {
            const updatedResponseData = data;
            return res.json(updatedResponseData);
        };
        res.error = async function done(data, errorCode) {
            const updatedResponseData = {
                operationId: req.trans_log_id,
                code: errorCode && errorCode.code ? errorCode.code : 1500,
                message: errorCode && errorCode.message ? errorCode.message : "Internal server error",
                data: errorCode && errorCode.data ? errorCode.data : data
            };
            appLogger.error(message, errorCode);
            res.status(errorCode && errorCode.status ? errorCode.status : 500);
            return res.json(updatedResponseData);
        };
        return next();
    } catch (err) {
        appLogger.error("Error in responseLogger", err);
    }
}

export default {
    reqLogger: requestLogger,
    resLogger: responseLogger,
};
