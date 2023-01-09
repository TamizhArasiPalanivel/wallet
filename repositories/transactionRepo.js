import TransactionSchema from "../models/transactionSchema.js";

export default class WalletRepo {
    constructor() {
        this.transactionSchema = TransactionSchema;
    }

    /**
     * insert new wallet record
     * @param query
     * @returns {Promise}
     */

    async doTransaction(params) {
        appLogger.debug("Start of repo: UserRepo, Method: doTransaction", params);
        try {
            console.log("paramsparams", params)
            return await this.transactionSchema(params).save();
        } catch (err) {
            appLogger.debug("End of repo: UserRepo, Method: doTransaction");
            appLogger.error("Error in UserRepo , Method: doTransaction", err);
            // custom erors can be added like below
            // const error = new ApplicationError(ERROR_TYPES.ERROR_WHILE_FETCHING_TEMPLATE);
            // error.addReason({ reason: "Error while fetching user name from database" });
            throw err;
        }
    }

    async getCurrentBalance(params) {
        appLogger.debug("Start of repo: UserRepo, Method: getCurrentBalance", params);
        try {
            console.log("paramsparams", params)
            return await this.transactionSchema.findOne({walletId:params.walletId}).sort({_id:-1});
        } catch (err) {
            appLogger.debug("End of repo: UserRepo, Method: getCurrentBalance");
            appLogger.error("Error in UserRepo , Method: getCurrentBalance", err);
            // custom erors can be added like below
            // const error = new ApplicationError(ERROR_TYPES.ERROR_WHILE_FETCHING_TEMPLATE);
            // error.addReason({ reason: "Error while fetching user name from database" });
            throw err;
        }
    }

    async getTransactions(query) {
        appLogger.debug("Start of repo: UserRepo, Method: getCurrentBalance", query);
        try {
            console.log("paramsparams", JSON.stringify(query))
            return await this.transactionSchema.aggregate(query);
        } catch (err) {
            appLogger.debug("End of repo: UserRepo, Method: getCurrentBalance");
            appLogger.error("Error in UserRepo , Method: getCurrentBalance", err);
            // custom erors can be added like below
            // const error = new ApplicationError(ERROR_TYPES.ERROR_WHILE_FETCHING_TEMPLATE);
            // error.addReason({ reason: "Error while fetching user name from database" });
            throw err;
        }
    }
}
