import uuid from 'uuid';
import WalletRepo from "../repositories/walletRepo.js";
import TransactionRepo from "../repositories/transactionRepo.js";

export default class WalletService {
    constructor() {
        this.walletRepo = new WalletRepo();
        this.transactionRepo = new TransactionRepo();
    }
    /**
     * @description Insert new wallet record
     * @param params
     */
    async setUpWallet(params) {
        try {
            appLogger.debug("Start of service: WalletService, Method: setUpWallet", params);
            // using uuid
            // params.id = uuid.v4();
            // using static reference
            const id = await this.walletRepo.getWalletCount();
            params.id = parseInt(process.env["WALLET_START_NUM"]) + id + 1;
            params.currentBalance = params.balance;
            let result = await this.walletRepo.setUpWallet(params);
            result = JSON.parse(JSON.stringify(result))
            delete result._id;
            delete result.currentBalance;
            return result;
        } catch (err) {
            appLogger.error("Error in Service: WalletService, Method: setUpWallet", err);
            throw err;
        } finally {
            appLogger.debug("End of service: WalletService, Method: setUpWallet");
        }
    }
    async getWallet(params) {
        try {
            appLogger.debug("Start of service: WalletService, Method: getWallet", params);
            let result = await this.walletRepo.getWalletRec(params);
            result = JSON.parse(JSON.stringify(result))
            result.balance = result.currentBalance;
            delete result._id;
            delete result.currentBalance;
            return result;
        } catch (err) {
            appLogger.error("Error in Service: WalletService, Method: getWallet", err);
            throw err;
        } finally {
            appLogger.debug("End of service: WalletService, Method: getWallet");
        }
    }
}
