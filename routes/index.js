import WalletController from "../controllers/walletController.js";
import TransactionController from "../controllers/transactionController.js";
import MIDDLEWARES from "appConfig/middlewareConfig.js";
import ApplicationMiddleware from "../middlewares/application.js";

export default function routes(app) {
    const walletController = new WalletController();
    const transactionController = new TransactionController();
    const applicationMiddleware = new ApplicationMiddleware();

    //wallet apis 
    //set up wallet
    app.post("/setup", walletController.setUpWallet);
    //get wallet info
    app.get("/wallet/:id", walletController.getWallet);
    //get all wallet 
    app.get("/allWallet", walletController.allWallet);

    
    //transaction apis
    //insert transaction
    app.post("/transact/:id", transactionController.doTransaction);
    //get transation with pagination
    app.get("/transactions", transactionController.getTransactions);
    //get transation, csv export
    app.get("/transactions/export", transactionController.csvExportTransactions);
}
