const express = require("express")

const app = express()

app.get("/:id", (req, res) => {
	const {id} = req.params
	res.send({
		title: `Titre ${id}`,
		content: "Content"
	})
})

app.get("/", (req, res) => {
	const {limit} = req.params
})

module.exports = app