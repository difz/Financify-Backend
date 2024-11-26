const mongoose = require('mongoose');
const { getUserById } = require('./user');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'Amount must be a non-negative number',
        },
    },
});


const AccountModel = mongoose.model('Account', accountSchema);

const createAccount = (query) => {
    return new AccountModel(query).save().then((account) => account.toObject());
};

const getAccount = (query) => {
    return AccountModel.find(query);
};

const getAccountById = (id) => {
    return AccountModel.findById(id);
};

const getAccountByName = (query) => {
    return AccountModel.find(query);
};


const deleteAccount = (id) => {
    return AccountModel.findOneAndDelete({ _id: id });
};

const updateAccount = (id, update) => {
    AccountModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
    });
};

module.exports = {
    createAccount,
    getAccount,
    getAccountById,
    getAccountByName,
    deleteAccount,
    updateAccount,
};