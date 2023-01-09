import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    id: { type: String, required: true }, //id
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    currentBalance: { type: Number, required: true },
    date: { type: Date, default: Date.now() }
    // createdBy: { type: String, default: "Logged in User will be taken from token" }
},{ versionKey: false }, {toJSON: {getters: true}});

export default mongoose.model("wallet", WalletSchema);
