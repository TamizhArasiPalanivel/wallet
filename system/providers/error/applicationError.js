import _ from "lodash";
import ErrorInfo from "./errorInfo.js";

export default class ApplicationError extends Error {
    constructor(info = new ErrorInfo()) {
        super();
        this.info = _.cloneDeep(info);
    }

    /**
     * @author Tamilarasi
     * @description add reason to error
     * reason can be of three types array, object or string,
     * in case of array or object it will get appended,
     * in case of string it will push one object having reason
     * attribute to hold the reason passed in function
     * @param { error reason } reason
     */
    addReason(reason) {
        if (!this.info.data) {
            this.info.data = [];
        }
        if (Array.isArray(reason)) {
            this.info.data = this.info.data.concat(reason);
        } else if (typeof reason === "string") {
            this.info.data.push({
                reason
            });
        } else {
            this.info.data.push(reason);
        }
    }

    /**
     * @author Tamilarasi
     * @description check whether reason is there in error or not
     * if there is an error then it is mandatory to add reason
     */
    get isError() {
        return this.info && this.info.data && this.info.data.length;
    }
}
