import { useState } from "react"

export default function NewGame({ mainMenu }) {
    const [username, setUsername] = useState('')

    function handleSubmit() {

    }

    function handleChange(e) {
        setUsername(e.target.value)
    }

    return (
        <div className="newGameMenuWrapper">
            <button onClick={mainMenu}>Menu</button>
            <ul>
                <li>Pick a unique username</li>
                <li>Hit "Begin Game"</li>
                <li>Find all the targets hidden in the image</li>
                <li>The clock starts when you begin — your time is your score</li>
                <li>Good luck!</li>
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={username}
                />

                <button type="submit">Begin Game</button>
            </form>
        </div>
    )
}