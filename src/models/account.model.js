const mongoose = require("mongoose")
const LedgerModel = require("./ledger.model")

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "account must be associated with a user"]
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive", "suspended"],
            message: "Status must be either active, inactive, or suspended"
        },
        default: "active"
    },
    currency: {
        type: String,
        required: [true, "currency is required"],
        default: "INR"
    }
}, {
    timestamps: true
})

accountSchema.index({user:1, status:1})

accountSchema.methods.getBalance = async function(){
    const LedgerData = await LedgerModel.aggregate([
    ])
     if(balanceData.length === 0){
        return 0
     }
        return balance[0].balance
}



const accountmodel = mongoose.model("Account", accountSchema)

module.exports = accountmodel