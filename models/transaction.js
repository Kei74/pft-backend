const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
	userId: { type: mongoose.ObjectId, index: true },
	category: String,
	amount: Number,
	date: Date
});

transactionSchema.statics.createTransaction = async function (userId, category, amount, date) {
	return this.create({ userId: userId, category: category, amount: amount, date: date });
};

transactionSchema.statics.findByUserId = async function (userId) {
	return this.find({ userId: userId });
};

transactionSchema.methods.saveModifiedDate = async function (email, hashedPassword) {
	this.markModified('date')
	return this.save();
};

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;