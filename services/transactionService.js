import uuid from 'uuid';
import WalletRepo from "../repositories/walletRepo.js";
import TransactionRepo from "../repositories/transactionRepo.js";

export default class TransactionService {
    constructor() {
        this.walletRepo = new WalletRepo();
        this.transactionRepo = new TransactionRepo();
    }
    async doTransaction(params) {
        try {
            appLogger.debug("Start of service: TransactionService, Method: doTransaction", params);
            const walletRec = await this.walletRepo.getWalletRec(params);
            let getCurrentBalance = await this.transactionRepo.getCurrentBalance(params);
            getCurrentBalance = JSON.parse(JSON.stringify(getCurrentBalance))
            params.id = uuid.v4();
            params.balance = walletRec.balance + (getCurrentBalance === null ? 0 : getCurrentBalance.balance) + params.amount;
            let result = await this.transactionRepo.doTransaction(params);
            await this.walletRepo.updateWallet(params);
            result = JSON.parse(JSON.stringify(result));
            delete result._id;
            return result;
        } catch (err) {
            appLogger.error("Error in Service: TransactionService, Method: doTransaction", err);
            throw err;
        } finally {
            appLogger.debug("End of service: TransactionService, Method: doTransaction");
        }
    }
    async getTransactions(params) {
        try {
            appLogger.debug("Start of service: TransactionService, Method: getTransactions", params);
            let query = [{
                "$match": {
                    walletId: params.walletId
                }
            },
            { $sort: { _id: -1 } },
            { $skip: parseInt(params.skip) },
            { $limit: parseInt(params.limit) },
            {
                $project: {
                    _id: 0,
                    id: "$id",
                    walletId: "$walletId",
                    amount: "$amount",
                    balance: "$balance",
                    description: "$description",
                    date: "$date",
                    type: "$type"
                }
            }
            ]
            let result = await this.transactionRepo.getTransactions(query);
            result = JSON.parse(JSON.stringify(result));
            return result;
        } catch (err) {
            appLogger.error("Error in Service: TransactionService, Method: getTransactions", err);
            throw err;
        } finally {
            appLogger.debug("End of service: TransactionService, Method: getTransactions");
        }
    }
}
