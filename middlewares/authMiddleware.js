import ERROR_TYPES from "error/errorTypes.js";
import AuthEncryptionUtils from "../utilities/commonUtils.js";

/**
 * Auth Middleware
 */
export default class AuthMiddleware {
    constructor() {
        this.authEncryptionUtils = new AuthEncryptionUtils();
    }

    /**
     * Authenticate user's headers
     * @param req
     * @param res
     * @param next
     */
    validateAuth() {
        return async (req, res, next) => {
            try {
                // validation part goes here
                next();
            } catch (err) {
                appLogger.error("Error in validateAuth Middleware:", err);
                return res.error(null, ERROR_TYPES.INVALID_TOKEN);
            }
        };
    }
}
