import ErrorCode from "appConfig/errorCode.js";
import TransactionService from "../services/transactionService.js";
import BaseController from "baseController";

export default class TransactionController extends BaseController{
    constructor() {
        super();
        this.transactionService = new TransactionService();
    }

    async doTransaction(req, res) {
        try {
            appLogger.debug("Start of controller: TransactionController, Method: doTransaction", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            const params = {
                walletId : req.params.id,
                amount : req.body.amount,
                description : req.body.description,
                type: req.body.amount && req.body.amount > 0 ? "CREDIT" : "DEBIT"
            }
            if (!params.walletId) {
                appLogger.error("Error in controller: TransactionController, Method: doTransaction", 
                `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.MISSING_WALLET_ID);
            }
            if (!params.amount && params.amount != 0 ) {
                appLogger.error("Error in controller: TransactionController, Method: doTransaction", 
                `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.MISSING_AMOUNT);
            }   
            if (!params.description || params.description.length === 0 ) {
                appLogger.error("Error in controller: TransactionController, Method: doTransaction", 
                `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.MISSING_DESC);
            }
            const result = await this.transactionService.doTransaction(params);
            appLogger.debug("End of controller: TransactionController, Method: doTransaction", JSON.stringify(result));
            res.done(result, "Succesfully added a transaction");
        } catch (err) {
            appLogger.error("Error in controller: TransactionController, Method: doTransaction", err);
            res.error(err, ErrorCode.INTERNAL_SERVER_ERROR);
        } finally {
            appLogger.debug("End of controller: TransactionController, Method: doTransaction");
        }
    }

    async getTransactions(req, res) {
        try {
            appLogger.debug("Start of controller: TransactionController, Method: getTransactions", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            const params = {
                walletId : req.query.walletId,
                skip : req.query.skip || 0,
                limit : req.query.limit || 10
            }
            if (!params.walletId) {
                appLogger.error("Error in controller: TransactionController, Method: getTransactions", 
                `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.MISSING_WALLET_ID);
            }
            const result = await this.transactionService.getTransactions(params);
            appLogger.debug("End of controller: TransactionController, Method: getTransactions", JSON.stringify(result));
            res.done(result, "Succesfully added a transaction");
        } catch (err) {
            appLogger.error("Error in controller: TransactionController, Method: getTransactions", err);
            if (err.info) {
                ErrorCode.INTERNAL_SERVER_ERROR.message = err.info;
                res.error(null, ErrorCode.INTERNAL_SERVER_ERROR, err.info);
            } else {
                res.error(err, ErrorCode.INTERNAL_SERVER_ERROR);
            }
        } finally {
            appLogger.debug("End of controller: TransactionController, Method: getTransactions");
        }
    }
}
