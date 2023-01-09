import ERROR_CODES from "appConfig/errorCode.js";

/**
 * @author Tamilarasi
 * @description expose all error types
 */
class ErrorTypes {
    constructor() {
        this.ERROR_CODES_CONFIG = ERROR_CODES;
    }
}
const ERROR_TYPES = new ErrorTypes().ERROR_CODES_CONFIG;
export default ERROR_TYPES;