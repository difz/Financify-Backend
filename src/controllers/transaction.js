const {
    createTransaction,
    getTransaction,
    getTransactionByAccount,
    getTransactionByType,
    getTransactionByCategory,
    getTransactionById,
    updateTransaction,
    deleteTransaction

} = require('../models/transaction');
const { use } = require('../routes/transaction');

const getAllTransactions = async (req, res) => {
    try {
        console.log(req.user._id);
        const userId = req.user._id;
        
        const transactions = await getTransaction({ userId });

        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions,
        });
       
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllTransactionByAccount = async (req, res) => {
    try {

        const userId = req.user._id;
        const {account} = req.params;

        if(!account){
            return res.status(400).json({
                message: "Account is required to fetch data!",
            });
        }
 
        const transactions =  await getTransactionByAccount({ userId, account });

        if (transactions.length === 0) {
            return res.status(404).json({
              message: `No transactions found for account: ${account}`,
            });
          }

        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions,
        });
        

    } catch (error) {        
        return res.status(500).json({
            message: error.message,
        });
    }
};


const getAllTransactionByType = async (req, res) => {
    try {
        const userId = req.user._id;
        const {type} = req.params;

        if(!type){
            return res.status(400).json({
                message: "Type is required to fetch data!",
            });
        }

        const transactions = await getTransactionByType({ userId, type });
        console.log(transactions);

        if (transactions.length === 0) {
            return res.status(404).json({
              message: `No transactions found for account: ${type}`,
            });
          }

        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions,
        });
      
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllTransactionByCategory = async (req, res) => {
    try {

        const userId = req.user._id;
        const {category} = req.params;

        if(!category){
            return res.status(400).json({
                message: "Category is required to fetch data!",
            });
        }

        const transactions = await getTransactionByCategory({ userId, category });

        if (transactions.length === 0) {
            return res.status(404).json({
              message: `No transactions found for account: ${category}`,
            });
          }

        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const createNewTransaction = async (req , res) => {
    try {
        const {
            account,
            type,
            category,
            amount,
            date,
            description
        } = req.body;

        if (!account || !type || !category || !amount ) {
            return res.status(400).json({
                message: "Please fill all the required fields",
            });
        }

        const userId = req.user._id;

        const newTransaction = await createTransaction({
        userId,
        account,
        type,
        category,
        amount,
        date,
        description
        });
        return res.status(201).json({
            message: "Transaction created successfully",
            transaction: newTransaction,
        })
        
    }
    catch (error) { 
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateTransactionById = async (req, res) => {
    try {  
        const { id } = req.params;
        const updateField = req.body;
        // const {
        //     account,
        //     type,
        //     category,
        //     amount,
        //     date,
        //     description
        // } = req.body;

        const existingTransaction = await getTransactionById({ _id: id});

        if(!existingTransaction){
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        const updatedTransaction = await updateTransaction(id, updateField);
        // const updatedTransaction = await updateTransaction(id, {
        //     account,
        //     type,
        //     category,
        //     amount,
        //     date,
        //     description
        // });

        return res.status(200).json({
            message: "Transaction updated successfully",
            updatedTransaction,
        });
       
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteSelectTransaction = async (req, res) => {
    try {
     
        const { id } = req.params;
    
        if(!id){
            return res.status(400).json({
                message: "Id is required to delete transaction!",
            });
        }

        
        const existingTransaction = await getTransactionById({ _id: id});
        console.log(existingTransaction);
        if(!existingTransaction){
         return res.status(404).json({
             message: "Transaction not found",
         });
        }

     const transactions = await deleteTransaction(id);   

    
     if (transactions.length === 0) {
        return res.status(404).json({
          message: `No transactions found for account: ${_id}`,
        });
      }

        return res.status(200).json({
            message: "Transaction deleted successfully",
            transactions,
        });   
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getAllTransactions,
    getAllTransactionByAccount,
    getAllTransactionByType,
    getAllTransactionByCategory,
    createNewTransaction,
    updateTransactionById,
    deleteSelectTransaction
};

