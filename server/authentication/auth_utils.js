const db = require("../database")

function validateEmail(email) {
	return email.match(
		/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
	) !== null
}

function validatePassword(password) {
	return (password.length >= 8) && (password.match(/[a-zA-Z]/) !== null) && (password.match(/[0-9]/) !== null) && (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*/) !== null)
}

async function registerFormValidationErrors(form) {
	errors = []

	if(form.username === undefined || form.password === undefined || form.email === undefined)
		return ["Formulaire incomplet"]
	
	if(!validateEmail(form.email))
		errors.push("Courriel non valide")

	if(!validatePassword(form.password))
		errors.push("Le mot de passe n'est pas asses puissant, il doit contenir: au moins 8 charactères, des caractères spéciaux, des chiffres et des lettres")

	if(username.length <= 4)
		errors.push("Nom d'utilisateur trop court")

	const user = await db.getUserByUsername(form.username)
	
	if(user !== undefined)
		errors.push("Un utilisateur avec le même nom existe déjà")

	return errors
}

function loginFormValidationErrors(form) {
	errors = []

	if(form.username === undefined || form.password === undefined)
		return ["Formulaire incomplet"]
	
	if(!validateEmail(form.email))
		errors.push("Courriel non valide")

	if(!validatePassword(form.password))
		errors.push("Le mot de passe n'est pas asses puissant, il doit contenir: au moins 8 charactères, des caractères spéciaux, des chiffres et des lettres")

	if(username.length <= 4)
		errors.push("Nom d'utilisateur trop court")

	return errors
}

module.exports = {
	registerFormValidationErrors
}