const mongoose = require("mongoose")


const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.ObjectId,
        ref: "Account",
        required: [true,"account is required"],
        index:true,
        immutable:true
    },
    balance:{
        type: Number,
        required:[true, "balance is required"],
        immutable:true

    },
    transaction:{
        type: mongoose.Schema.ObjectId,
        ref:"Transaction",
        required: [true, "transaction is required"],
        index:true,
        immutable:true

    },

    type:{
        type: String,
        enum:{
            values: ["debit", "credit"],
            message: "type must be debit or credit"
        },
        required: [true, "ledger type is required"],
        immutable:true
    }
})

            function preventLedgerModification(next){
                throw new Error("ledger entries are immutable and cannot be modified")
            }

        ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
        ledgerSchema.pre('updateOne', preventLedgerModification);
        ledgerSchema.pre('updateMany', preventLedgerModification);
        ledgerSchema.pre('remove', preventLedgerModification);
        ledgerSchema.pre('deleteOne', preventLedgerModification);
        ledgerSchema.pre('deleteMany', preventLedgerModification);
        ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
        ledgerSchema.pre("findOneAndReplace", preventLedgerModification);


        const LedgerModel = mongoose.model("Ledger", ledgerSchema)

        module.exports = LedgerModel;