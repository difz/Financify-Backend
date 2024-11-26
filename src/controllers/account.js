const {
    createAccount,
    getAccount,
    getAccountById,
    getAccountByName,
    deleteAccount,
    updateAccount,
} = require('../models/account');
const { getUserById } = require('../models/user');

const createUserNewAccount = async (req, res) => {
    try {
        const { accountName, amount } = req.body; // Extract account-specific data
        const userId = req.user._id; // Get userId from authenticated user

        if (!accountName || amount === undefined) {
            return res.status(400).json({
                message: "Account name and amount are required",
            });
        }

        // Fetch the user's username using their userId
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Create the account with the username and userId
        const newAccount = await createAccount({
            userId,
            username: user.username, // Auto-fill the username
            accountName,
            amount,
        });

        return res.status(201).json({
            message: "Account created successfully",
            account: newAccount,
        });
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({
            message: error.message,
        });
    }
};


const getAllAccounts = async (req, res) => {
    try {
        const userId = req.user._id;
        const accounts = await getAccount({ userId });

        return res.status(200).json({
            accounts,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getUserAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const account = await getAccountById(id);

        if (!account) {
            return res.status(404).json({
                message: 'Account not found',
            });
        }

        if (account.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }

        return res.status(200).json({
            account,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getUserAccountByName = async (req, res) => {
    try {
        const  accountName  = decodeURIComponent(req.params.accountName);
        const userId = req.user._id;

        const account = await getAccountByName({ userId, accountName });

        if (!account) {
            return res.status(404).json({
                message: 'Account not found',
            });
        }

        return res.status(200).json({
            account,
        });
    } catch (error) {
        console.error('Error fetching account by name:', error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteUserAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const account = await getAccountById(id);

        if (!account) {
            return res.status(404).json({
                message: 'Account not found',
            });
        }

        if (account.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }

        await deleteAccount(id);

        return res.status(200).json({
            message: 'Account deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateUserAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const update = req.body;

        const account = await getAccountById(id);

        if (!account) {
            return res.status(404).json({
                message: 'Account not found',
            });
        }

        if (account.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }

        const updatedAccount = await updateAccount(id, update);

        return res.status(200).json({
            message: 'Account updated successfully',
            account: updatedAccount,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const transferAccount = async (req, res) => {
    try{
        const {from, to, amount} = req.body;
        const fromAccount = await getAccountById(from);
        const toAccount = await getAccountById(to);
        if(!fromAccount || !toAccount){
            return res.status(404).json({
                message: 'Account not found',
            });
        }
        if(fromAccount.amount < amount){
            return res.status(400).json({
                message: 'Insufficient funds',
            });
        }
        const updatedFromAccount = await updateAccount(from, {amount: fromAccount.amount - amount});
        const updatedToAccount = await updateAccount(to, {amount: toAccount.amount + amount});
        return res.status(200).json({
            message: 'Transfer successful',
            fromAccount: updatedFromAccount,
            toAccount: updatedToAccount,
        });
    }
    catch(e){
        return res.status(500).json({
            message: error.message,
        })
    }
    
}

module.exports = {
    createUserNewAccount,
    getAllAccounts,
    getUserAccountById,
    getUserAccountByName,
    deleteUserAccount,
    updateUserAccount,
    transferAccount,
};
