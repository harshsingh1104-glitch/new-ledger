const {router} = require('express');
const transactionController = require('../controllers/transaction.controller');
const authMiddleWare = require('../middleware/auth.middleware');



const transactionRoutes = Router();

/**
 * -post/api/transaction/
 * -create a new transaction
 */

transactionRoutes.post("/",authMiddleWare.authMiddleWare,transactionController.createTransaction)




module.exports = transactionRoutes;
