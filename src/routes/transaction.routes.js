const {router} = require('express');
const authMiddleWare = require('../middleware/auth.middleware');



const transactionRoutes = Router();

/**
 * -post/api/transaction/
 * -create a new transaction
 */

transactionRoutes.post("/",authMiddleWare.authMiddleWare)




module.exports = transactionRoutes;
