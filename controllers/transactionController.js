const Transaction = require('../models/transaction');


async function postTransaction(req, res) {
	const { category, amount } = req.params;
	if (!category || !amount) {
		res.status(400).send("Missing category or amount");
		return;
	}
	let date = req.params.date;
	if (!date)
		date = Date.now();
	try {
		const transaction = await Transaction.createTransaction(res.userId, category, amount, date);
		res.status(201).json(transaction);
	} catch (error) {
		res.status(500).send(`Error creating transaction: ${error.message}`)
	}

}

async function getAllTransactions(req, res) {
	try {
		const transactions = await Transaction.findByUserId(res.userId);
		res.status(200).json(transactions)
	} catch (error) {
		res.status(500).send("Error fetching transactions")
	}
}

async function deleteTransactionById(req, res) {
	const { transactionId } = req.params;

	if (!transactionId) {
		res.status(400).send("Cannot parse transaction Id");
		return;
	}

	try {
		const { deletedCount } = await Transaction.deleteOne({ _id: transactionId });

		if (deletedCount == 0) {
			res.status(404).send("Transaction not found");
			return;
		}

		res.status(200).send("Transaction deleted");
	} catch (error) {
		res.status(500).send("Error deleting transaction")
	}

}

module.exports = { postTransaction, getAllTransactions, deleteTransactionById }