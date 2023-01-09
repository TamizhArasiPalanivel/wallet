import WalletSchema from "../models/walletSchema.js";

export default class WalletRepo {
    constructor() {
        this.walletSchema = WalletSchema;
    }

    /**
     * insert new wallet record
     * @param query
     * @returns {Promise}
     */

    async setUpWallet(params) {
        appLogger.debug("Start of repo: WalletRepo, Method: setUpWallet", params);
        try {
            return await this.walletSchema(params).save();
        } catch (err) {
            appLogger.error("Error in WalletRepo , Method: setUpWallet", err);
            // custom erors can be added like below
            // const error = new ApplicationError(ERROR_TYPES.ERROR_WHILE_FETCHING_TEMPLATE);
            // error.addReason({ reason: "Error while fetching user name from database" });
            throw err;
        } finally {
            appLogger.debug("End of repo: WalletRepo, Method: setUpWallet");
        }
    }
    async getWalletCount(params) {
        appLogger.debug("Start of repo: WalletRepo, Method: getWalletCount", params);
        try {
            return await this.walletSchema.findOne({}).count()
        } catch (err) {
            appLogger.error("Error in WalletRepo , Method: getWalletCount", err);
            throw err;
        } finally {
            appLogger.debug("End of repo: WalletRepo, Method: getWalletCount");
        }
    }
    async getWalletRec(params) {
        appLogger.debug("Start of repo: WalletRepo, Method: getWalletRec", params);
        try {
            return await this.walletSchema.findOne({ id: params.walletId })
        } catch (err) {
            appLogger.error("Error in WalletRepo , Method: getWalletRec", err);
            throw err;
        } finally {
            appLogger.debug("End of repo: WalletRepo, Method: getWalletRec");
        }
    }
    async doTransaction(params) {
        appLogger.debug("Start of repo: WalletRepo, Method: doTransaction", params);
        try {
            return await this.transactionSchema(params).save();
        } catch (err) {
            appLogger.debug("End of repo: WalletRepo, Method: doTransaction");
            appLogger.error("Error in WalletRepo , Method: doTransaction", err);
            // custom erors can be added like below
            // const error = new ApplicationError(ERROR_TYPES.ERROR_WHILE_FETCHING_TEMPLATE);
            // error.addReason({ reason: "Error while fetching user name from database" });
            throw err;
        }
    }
    async updateWallet(params) {
        appLogger.debug("Start of repo: WalletRepo, Method: updateWallet", params);
        try {
            return await this.walletSchema.updateOne({ id: params.walletId }, [{ $set: { "currentBalance": { "$add": ["$currentBalance", params.amount] } } }])
        } catch (err) {
            appLogger.debug("End of repo: WalletRepo, Method: updateWallet");
            appLogger.error("Error in WalletRepo , Method: updateWallet", err);
            // custom erors can be added like below
            // const error = new ApplicationError(ERROR_TYPES.ERROR_WHILE_FETCHING_TEMPLATE);
            // error.addReason({ reason: "Error while fetching user name from database" });
            throw err;
        }
    }
}
