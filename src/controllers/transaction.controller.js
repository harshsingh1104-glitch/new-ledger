const requireTransactionService = require('../services/transaction.service')
const lederModel = require('../models/ledger.model')
const accountModel = require('../models/account.model')
const emailservice = require('../services/email.service')

 /*
 * - create a new transaction
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

   