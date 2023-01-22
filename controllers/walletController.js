import ErrorCode from "appConfig/errorCode.js";
import WalletService from "../services/walletService.js";
import BaseController from "baseController";

export default class WalletController extends BaseController {
    constructor() {
        super();
        this.walletService = new WalletService();
    }

    /**
     * @description Setup wallet
     * @param {object} req Request object
     * @param {object} res Response object
     */

    async setUpWallet(req, res) {
        try {
            appLogger.debug("Start of controller: WalletController, Method: setUpWallet", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            const params = {
                balance: req.body.balance,
                currentBalance: req.body.balance,
                name: req.body.name
            }
            if (!params.balance && params.balance != 0) {
                appLogger.error("Error in controller: WalletController, Method: setUpWallet",
                    `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.BAD_REQUEST_WALLET_OPENING_BALANCE);
            }
            if (!params.name) {
                appLogger.error("Error in controller: WalletController, Method: setUpWallet",
                    `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.BAD_REQUEST_WALLET_NAME);
            }
            const result = await this.walletService.setUpWallet(params);
            appLogger.debug("End of controller: WalletController, Method: setUpWallet", JSON.stringify(result));
            res.done(result, "Succesfully created new wallet");
        } catch (err) {
            appLogger.error("Error in controller: WalletController, Method: setUpWallet", err);
            if (err.info) {
                ErrorCode.INTERNAL_SERVER_ERROR.message = err.info;
                res.error(null, ErrorCode.INTERNAL_SERVER_ERROR, err.info);
            } else {
                res.error(err, ErrorCode.INTERNAL_SERVER_ERROR);
            }
        } finally {
            appLogger.debug("End of controller: WalletController, Method: setUpWallet");
        }
    }

    async getWallet(req, res) {
        try {
            appLogger.debug("Start of controller: WalletController, Method: getWallet", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            const params = {
                walletId: req.params.id
            }
            if (!params.walletId) {
                appLogger.error("Error in controller: WalletController, Method: getWallet", 
                `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
                res.error(null, ErrorCode.MISSING_WALLET_ID);
            }
            const result = await this.walletService.getWallet(params);
            appLogger.debug("End of controller: WalletController, Method: getWallet", JSON.stringify(result));
            res.done(result, "Succesfully created new wallet");
        } catch (err) {
            appLogger.debug("End of controller: WalletController, Method: getWallet", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            appLogger.error("Error in controller: WalletController, Method: getWallet", err);
            if (err.info) {
                ErrorCode.INTERNAL_SERVER_ERROR.message = err.info;
                res.error(null, ErrorCode.INTERNAL_SERVER_ERROR, err.info);
            } else {
                res.error(err, ErrorCode.INTERNAL_SERVER_ERROR);
            }
        } finally {
            appLogger.debug("End of controller: WalletController, Method: getWallet");
        }
    }

    async allWallet(req, res) {
        try {
            appLogger.debug("Start of controller: WalletController, Method: allWallet", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            const result = await this.walletService.allWallet();
            appLogger.debug("End of controller: WalletController, Method: allWallet", JSON.stringify(result));
            res.done(result, "Succesfully created new wallet");
        } catch (err) {
            appLogger.debug("End of controller: WalletController, Method: allWallet", `URL: ${req.originalUrl} PARAMS: ${JSON.stringify(req.params)} BODY: ${JSON.stringify(req.body)} QUERY: ${JSON.stringify(req.query)}`);
            appLogger.error("Error in controller: WalletController, Method: allWallet", err);
            if (err.info) {
                ErrorCode.INTERNAL_SERVER_ERROR.message = err.info;
                res.error(null, ErrorCode.INTERNAL_SERVER_ERROR, err.info);
            } else {
                res.error(err, ErrorCode.INTERNAL_SERVER_ERROR);
            }
        } finally {
            appLogger.debug("End of controller: WalletController, Method: allWallet");
        }
    }
}
