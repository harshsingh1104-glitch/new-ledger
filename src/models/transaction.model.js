const mongoose = require('mongoose');


const transactionschema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "transaction is required"],
    index: true
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "transaction is required"],
    index: true
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "completed", "failed"],
      message: "status must be pending, completed or failed",
    },
    default: "pending"
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
    min: [0, "amount must be positive"]
  },
  idempotencykey: {
    type: String,
    required: [true, "idempotency key is required"],
    unique: true
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionschema);
module.exports = Transaction;