const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	email: { type: String, index: true },
	password: String,
});

userSchema.statics.findByEmail = async function(email) {
	return this.findOne({ email: email});
};

userSchema.statics.createUser = async function(email, hashedPassword) {
	return this.create({email: email, password: hashedPassword});
};

const User = mongoose.model('User', userSchema);

module.exports = User;