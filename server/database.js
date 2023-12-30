const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")

let db = new sqlite3.Database("db.sqlite", (err) => {
	if(err) {
		console.error(err)
		throw err
	}

	// create database
	db.run(`CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username text, 
		email text, 
		password text,
		salt text,
		token text,
		last_login DATE,
		creation DATE
	)`, (err) => {})

	db.run(`CREATE TABLE posts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title text, 
		content text,
		creation DATE,
		user_id INTEGER NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users (id)
	)`, (err) => {})

	db.run(`CREATE TABLE comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		post_id INTEGER NOT NULL,
		content TEXT,
		created DATE,
		FOREIGN KEY (user_id) REFERENCES users (id),
		FOREIGN KEY (post_id) REFERENCES posts (id)
	)`, (err) => {})
})

function getUserById(id) {
	const query = `SELECT * FROM users WHERE id == ?`

	return new Promise((resolve, reject) => {
		db.all(query, [id], (err, res) => {
			if(err) reject()
			resolve(res[0])
		})
	})
}

function removeUserById(id) {
	
}

async function createUser(user) {
	const {username, email, password} = user 
	const salt = await bcrypt.genSalt(10)
	var insert = 'INSERT INTO Users (username, email, password, salt, creation) VALUES (?,?,?,?,?)'
	db.run(insert, [username, email, bcrypt.hashSync(password, salt), salt, Date('now')])
}

async function getUserByUsername(username) {
	const query = `SELECT * FROM users WHERE username == ?`
	return new Promise( (resolve, reject) => {
		db.all(query, [username], (err, res) => {
			if(err) reject() 
			resolve(res[0])
		})
	})
}

module.exports = {
	getUserById,
	removeUserById,
	createUser,
	getUserByUsername
}