const jwt = require("jsonwebtoken")

function authenticateUser(req, res, next) {
	const authorization = req.headers.authorization

	if( authorization ) {
		jwt.verify(authorization, process.env.TOKEN_KEY, (err, user) => {
			if(err) {
				console.log("invalid jwt")
				return
			}
			req.user = user
			next()
		})
	}

	next()
}

function requireAuthentication(req, res, next) {
	if(req.user !== undefined)
		next()
}

module.exports = {
	requireAuthentication,
	authenticateUser
}