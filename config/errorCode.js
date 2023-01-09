const HTTP_CODES = {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    RESOURCE_MOVED: 410,
    TEMPORARAY_DOWN: 503,
    TIME_OUT: 504,
    NO_ACCESS: 403,
    CONFLICT: 409,
};

export default {
    DB_CONNECTION_FAILED: {
        code: "1000",
        message: "Unexpected, Database connectivity failed",
        status: HTTP_CODES.BAD_REQUEST,
    },
    DB_URL_MISSING: {
        code: "1001",
        message: "Unexpected, Database url is missing, kindly contact admin",
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
    },
    INTERNAL_SERVER_ERROR: {
        code: "1002",
        message: "Internal server error",
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
    },
    BAD_REQUEST_WALLET_NAME: {
        code: "1003",
        message: "Invalid request, Missing info: Wallet Name",
        status: HTTP_CODES.BAD_REQUEST,
    },
    BAD_REQUEST_WALLET_OPENING_BALANCE: {
        code: "1003",
        message: "Invalid request, Missing info: Wallet Opening Balance",
        status: HTTP_CODES.BAD_REQUEST,
    },
    MISSING_WALLET_ID: {
        code: "1003",
        message: "Invalid request, Missing info: Wallet ID",
        status: HTTP_CODES.BAD_REQUEST,
    },
    MISSING_AMOUNT: {
        code: "1003",
        message: "Invalid request, Missing info: Transation amount",
        status: HTTP_CODES.BAD_REQUEST,
    },
    MISSING_DESC: {
        code: "1003",
        message: "Invalid request, Missing info: Transation description",
        status: HTTP_CODES.BAD_REQUEST,
    },
};
