const express = require("express")
const db = require("../database")

const app = express()

app.get("/:id", async(req, res) => {
	const {id} = req.params
	if(id === undefined) {
		res.status(400).json({error: "no id given"})
		return
	}

	const post = await db.getPostById(id)
	res.status(200).json(post)
})

app.get("/", (req, res) => {
	const {query} = req.params
	
})

module.exports = app