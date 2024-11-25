    const mongoose = require('mongoose');

    const transactionShcema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        account:{
            type: String,
            required: true
        },
        type:{
            type: String,
            enum: ['income','expense'],
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date, 
            default: Date.now,
        },
        description:{
            type: String,
        },
    });

    const TransactionModel = mongoose.model("Transaction", transactionShcema);

    const getTransaction = (query) => {
        return TransactionModel.find(query);
    }

    const getTransactionByAccount = (query) => {
        return TransactionModel.find(query);
    };

    const getTransactionByCategory = (query) => {
        return TransactionModel.findOne(query);
    };

    const getTransactionByType = (query) => {
       return TransactionModel.find(query);
    };

    const createTransaction = (values) => 
        new TransactionModel(values).save().then((transaction) => transaction.toObject());

    const deleteTransaction = (id) =>
        TransactionModel.findOneAndDelete({_id: id});

    // const updateTransaction = (id, values) =>
    //     TransactionModel.findByIdAndUpdate(id, values, {
    //         new: true,
    //         runValidators: true,
    //     });

    module.exports ={
        getTransaction,
        getTransactionByAccount,
        getTransactionByCategory,
        getTransactionByType,
        createTransaction,
        TransactionModel,
        deleteTransaction,
        // updateTransaction,
        
    };
