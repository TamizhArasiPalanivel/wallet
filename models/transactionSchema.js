import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    id: { type: String, required: true }, //transaction id
    walletId: { type: String, required: true }, // wallet id
    amount: {type: Number, required: true},
    description: { type: String, required: true },
    balance: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now() }
    // createdBy: { type: String, default: "Logged in User will be taken from token" }
},{ versionKey: false }, {toJSON: {getters: true}});

export default mongoose.model("transaction", TransactionSchema);
