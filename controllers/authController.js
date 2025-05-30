const User = require('../models/user');
const bcrypt = require('bcrypt');

const { createJwt } = require('../services/authService')

const saltRounds = 10;

async function postLogin(req, res) {
	const { email, password } = req.body;
	if(!email || !password) {
		res.status(400).send("Missing email or password");
		return;
	}
	const user = await User.findByEmail(email);
	if (!user) {
		res.status(401).send("Email not found");
	}

	const passMatch = await bcrypt.compare(password, user.password);
	if (passMatch == false) {
		res.status(401).send("Invalid credentials");
		return;
	}

	const token = createJwt(user);

	res.status(200).json({
		success: true,
		data: {
			userId: user._id,
			email: user.email,
			token: token,
		},
	});
	// res.status(200).send("Successfully logged in!");
}

async function postSignup(req, res) {
	const { email, password } = req.body;
	const existingUser = await User.findByEmail(email);
	if (existingUser) {
		res.status(422).send("Email already exists");
		return;
	}
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const newUser = await User.createUser(email, hashedPassword);

		res.status(201).json({
			id: newUser._id,
			email: newUser.email
		});
	} catch (error) {
		res.status(500).send(`Error creating user: ${error.message}`)
	}
}

module.exports = { postLogin, postSignup };