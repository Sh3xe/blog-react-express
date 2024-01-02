const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")

/*
TODO:
	- use cascad delete
	- considering a general function to handle promises (run_statement(query, params))
	- use prepared statements
*/

let db = new sqlite3.Database("db.sqlite", (err) => {
	if(err) {
		console.error(err)
		throw err
	}

	// create database
	db.run(`CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username text UNIQUE,
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

function removePostComments(post_id) {
	const query = `DELETE FROM comments WHERE post_id = ?`
	return new Promise((resolve, reject) => {
		db.run(query, [post_id], (err, rows) => {
			if(err) reject(err)
			else resolve()
		})
	})
}

async function removePost(post_id) {
	await removePostComments(post_id)
	const query = `DELETE FROM posts WHERE id = ?`
	return new Promise((resolve, reject) => {
		db.run(query, [post_id], (err, rows) => {
			if(err) reject(err)
			else resolve()
		})
	})
}

function removeUserComments(user_id) {
	const query = `DELETE FROM comments WHERE user_id = ?`
	return new Promise((resolve, reject) => {
		db.run(query, [user_id], (err, rows) => {
			if(err) reject(err)
			else resolve()
		})
	})
}

function getUserPosts(user_id) {
	const query = `SELECT * FROM posts WHERE user_id = ?`
	return new Promise((resolve, reject) => {
		db.all(query, [user_id], (err, rows) => {
			if(err) reject(err)
			else resolve(rows)
		})
	})
}

async function removeUserPosts(user_id) {
	try {
		const user_posts = await getUserPosts(user_id)
		let promises = []
		for( let post of user_posts ) {
			promises.push( db.removePost(post.id) )
		}
		return Promise.all(promises)
	} catch( err ) {
		return new Promise((resolve,reject) => reject())
	}
}

function getUserById(id) {
	const query = `SELECT * FROM users WHERE id = ?`

	return new Promise((resolve, reject) => {
		db.all(query, [id], (err, res) => {
			if(err) reject(err)
			resolve(res[0])
		})
	})
}

function removeUserById(user_id) {
	const query = `DELETE FROM users WHERE id = ?`
	return new Promise( async(resolve, reject) => {
		try {
			await removeUserComments(user_id)
			await removeUserPosts(user_id)
			db.run(query, [user_id], (err, res) => {
				if(err) reject(err)
				resolve()
			})
		} catch(err) {
			reject(err)
		}
	})
}

async function createUser(user) {
	const {username, email, password} = user 
	const salt = await bcrypt.genSalt(10)
	var insert = `INSERT INTO users (username, email, password, salt, creation) VALUES (?,?,?,?,?)`
	db.run(insert, [username, email, bcrypt.hashSync(password, salt), salt, Date("now")])
}

function getUserByUsername(username) {
	const query = `SELECT * FROM users WHERE username = ?`
	return new Promise( (resolve, reject) => {
		db.all(query, [username], (err, res) => {
			if(err) reject(err) 
			resolve(res[0])
		})
	})
}

function createPost(post) {
	const {title, content, user_id} = post
	const query = `INSERT INTO posts (title, content, creation, user_id) VALUES (?,?,?,?)`
	return new Promise((resolve, reject) => {
		db.run(query, [title, content, Date("now"), user_id], (err) => {
			if(err) reject(err)
			else resolve()
		})
	})
}

function createComment(comment) {
	const {user_id, post_id, content} = comment
	const query = `INSERT INTO comments (user_id, post_id, content, created) VALUES (?,?,?,?)`
	return new Promise((resolve, reject) => {
		db.run(query, [user_id, post_id, content, Date("now")], (err) => {
			if(err) reject(err)
			else resolve()
		})
	})
}

function getPostById(post_id) {
	const query = `SELECT * FROM posts WHERE id = ?`
	return new Promise( (resolve, reject) => {
		db.all(query, [post_id], (err, res) => {
			if(err) reject(err) 
			resolve(res[0])
		})
	})
}

module.exports = {
	createPost,
	createComment,
	createUser,
	removePost,
	removeUserPosts,
	removeUserById,
	removeUserComments,
	removePostComments,
	removeUserById,
	getUserById,
	getUserByUsername,
	getPostById,
	getUserPosts
}