import {useState, useContext} from "react"
import UserContext from "../App"

function CreatePost() {

	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [user, setUser] = useContext(UserContext)

	const onTitleChange = (e) => {
		setTitle(e.target.value)
	}

	const onContentChange = (e) => {
		setContent(e.target.value)
	}

	const submit = (e) => {
		e.preventDefault()
		console.log({user, title, content})
	}

	return <form action="">
		<input type="text" placeholder="Titre" value={title} onChange={onTitleChange}/>
		<textarea value={content} onChange={onContentChange} cols="30" rows="10"></textarea>
		<button type="submit">Envoyer</button>
	</form>
}

export default CreatePost