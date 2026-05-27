const requireTransactionService = require('../services/transaction.service')
const lederModel = require('../models/ledger.model')
const accountModel = require('../models/account.model')
const emailservice = require('../services/email.service')
const mongoose = require('mongoose')
const transactionModel = require('../models/transaction.model')

 /*
 * - validate user input
 *- validate idempotency key
 *- derive sender balance from ledger
 *- crate transaction with pending status
 *- create debit entry in ledger
 *- create credit entry in ledger
 *- update transaction status to completed
 *- commit mongoDB session
 *- send email notification to sender and receiver
 */


   async function createTransaction(req,res){
    const {fromAccount, toAccount, amount, idempotencykey} = req.body
    if (!fromAccount || !toAccount || !amount || !idempotencykey){
        return res.status(400).json({
            message: "fromAccount, toAccount, amount and idempotencykey are required"

        })
    }
    
}

   // validate user input


     const fromUser = await accountModel.findOne({
        _id: fromAccount
     })
     const toUser = await accountModel.findOne({
        _id: toAccount
     })
    
       if(!fromUser || !toUser){
        return res.status(404).json({
            message: "fromAccount or toAccount not found"
        })

}
    
    // validate idempotency key
    const isTransactionAlreadyExists = await transactionModel.findOne({
      idempotencykey: idempotencykey
    });
    if (isTransactionAlreadyExists) {
      if (isTransactionAlreadyExists.status === "completed") {
        return res.status(200).json({
          message: "transaction with this idempotency key already exists and is completed"
        });
      }
      if (isTransactionAlreadyExists.status === "pending") {
        return res.status(200).json({
          message: "transaction is still pending"
        });
      }
          
      // check account status
      if (!fromUser || fromtoAccount.status !== "active"){
        return res.status(400).json({
          message: "fromAccount or toAccount is not active"
        })
      }

     // derive sender balnce from ledger
      const balance = await fromUser.getBalance()
      if (balance > amount){
        return res.status(400).json({
          message: `insufficient balance.balance is ${balance} requested amount is ${amount}`
        })
      }

     // create trancsation with pending status

      const session = await mongoose.startSession()
      session.startTransaction()
       
      const transaction = await transactionModel.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "pending"
      },{session})

      // create debit entry on ledger

      const debitLedgerEntry = await LedgerModel.create({
        account: fromAccount,
        amount: -amount,
        transaction: transaction._id,
        type: "debit"
      },{session})

      const creditLedgerEntry = await LedgerModel.create({
        account: toAccount,
        amount:amount,
        transaction: transaction._id,
        type:"credit"},{session})

        // email  notification to sender and receiver

        await emailService.sendTransactionEmail(fromUser.emailService, toUser.email, amount)
         return res.status(200).json({
          message: "transaction created succesfully"
         })
      }

    
      



    