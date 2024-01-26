const express = require("express")
const jwt = require("jsonwebtoken")
const db = require("../database")
const {registerFormValidationErrors} = require("./auth_utils")

const app = express()

app.post("/login", async(req, res) => {
	const {username, password} = req.body

	const validationErrors = loginFormValidationErrors({username, password})

	if(validationErrors.length !== 0) {
		res.status(400).json({errors: validationErrors})
		return
	}
	
	const user = await db.getUserByUsername(username)
	const jwt_token = jwt.sign({ username, id: user.id }, process.env.TOKEN_KEY)
	res.json({accessToken: jwt_token})
})

app.post("/register", async(req, res) => {
	const {username, password, email} = req.body

	const validationErrors = registerFormValidationErrors({username, password, email})

	if(validationErrors.length !== 0) {
		res.status(400).json({errors: validationErrors})
		return
	}

	const user = await db.createUser({username, password, email})
	const jwt_token = jwt.sign({ username, id: user.id }, process.env.TOKEN_KEY)
	res.json({accessToken: jwt_token})
})

module.exports = app