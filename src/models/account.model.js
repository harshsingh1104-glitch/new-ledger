const mongoose = require("mongoose")


const accountschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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

accountschema.index({user:1, status:1})





const accountmodel = mongoose.model("account", accountschema)

module.exports = accountmodel