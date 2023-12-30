const express = require("express")
const db = require("../database")
const app = express()

app.get("/:id", async (req, res) => {
	const {id} = req.params
	if (!id) {
		res.status(400).send({message: "Missing Id"})
	}

	user = await db.getUserById(Number(id))
	const safe_user = {
		username: user.username,
		creation: user.creation
	}
	res.status(200).send(safe_user)
})

app.post("/", async (req, res) => {
	const {username, email, password} = req.body
	
	if( !(username && email && password) ) {
		res.status(400).send({message: "Invalid body for authentication"})
	}

	await db.createUser({username, email, password})
	res.status(200)
})

module.exports = app