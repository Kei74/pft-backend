const jwt = require('jsonwebtoken')


function verifyAuth(req, res, next) {
	if(!req.headers.authorization) {
		res.status(401).send("Error! Auth token was not provided.");
		return;
	}
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		res.status(401).send("Error! Auth token was not provided.");
		return;
	}
	//Decoding the token
	const decodedToken = jwt.verify(token, process.env.JWT_KEY)
	if (!decodedToken) {
		res.status(401).send("Error! Invalid auth token.");
		return;
	}
	res.userId = decodedToken.userId;
	res.email = decodedToken.email;
	next();
}

function createJwt(user) {
	const token = jwt.sign(
		{
			userId: user._id,
			email: user.email
		},
		process.env.JWT_KEY,
	);
	return token;
}

module.exports = { verifyAuth, createJwt };