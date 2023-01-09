import MIDDLEWARE_LIST from "appConfig/middlewareList.js";
import AuthMiddleware from "./authMiddleware.js";

export default class ApplicationMiddleware {
    constructor() {
        this.authMiddleware = new AuthMiddleware();
    }

    init(middlewareList) {
        middlewareList = middlewareList.reduce((mappedMiddlewares, middlewareType) => {
            const mappedMiddleware = this.getMiddlewareByType(middlewareType);
            if (mappedMiddleware) {
                mappedMiddlewares.push(mappedMiddleware);
            }
            return mappedMiddlewares;
        }, []);
        return middlewareList;
    }

    getMiddlewareByType(type) {
        switch (type) {
            case MIDDLEWARE_LIST.AUTH_VALIDATE_TOKEN_MIDDLEWARE:
                return this.authMiddleware.validateAuth();
        }
    }
}
