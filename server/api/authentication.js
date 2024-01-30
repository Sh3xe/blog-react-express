const express = require("express")
const jwt = require("jsonwebtoken")
const db = require("../database")
const bcrypt = require("bcrypt")
const {registerFormValidationErrors, loginFormValidationErrors} = require("../authentication/auth_utils")

const app = express()

app.post("/login", async(req, res) => {
	const {username, password} = req.body

	const validationErrors = loginFormValidationErrors({username, password})

	if(validationErrors.length !== 0) {
		res.status(400).json({errors: validationErrors})
		return
	}
	
	const user = await db.getUserByUsername(username)
	// check if user exists
	if(user === undefined) {
		res.status(400).json({errors: ["Nom d'utilisateur ou mot de passe incorrect"]})
		return
	}
	
	// check if the password is correct
	const is_password_correct = await bcrypt.compare(password, user.password)
	if( !is_password_correct ) {
		res.status(400).json({errors: ["Nom d'utilisateur ou mot de passe incorrect"]})
		return
	}
	
	// manage session
	const jwt_token = jwt.sign({ username, id: user.id }, process.env.TOKEN_KEY)
	res.json({accessToken: jwt_token, username, id: user.id})
})

app.post("/register", async(req, res) => {
	const {username, password, email} = req.body

	const validationErrors = await registerFormValidationErrors({username, password, email})
	
	if(validationErrors.length !== 0) {
		res.status(400).json({errors: validationErrors})
		return
	}

	await db.createUser({username, password, email})
	const user = await db.getUserByUsername(username)
	const jwt_token = jwt.sign({ username: user.username, id: user.id }, process.env.TOKEN_KEY)
	res.json({accessToken: jwt_token})
})

module.exports = app