const express = require("express")
const cors = require("cors")

require("dotenv").config()

const app = express()
const PORT = 8080

app.use(cors())

app.use(express.json())

app.use("/user", require("./routes/user"))
app.use("/post", require("./routes/post"))

app.listen( PORT, () => {
	console.log(`App running on port ${PORT}`)
})