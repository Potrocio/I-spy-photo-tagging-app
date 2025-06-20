import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function NewGame({ mainMenu }) {
    const [username, setUsername] = useState('')

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (username) {
            try {
                const response = await fetch("http://localhost:4044/users", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username })
                })

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`)
                }

                const user = await response.json()

                if (user) {
                    localStorage.setItem("userStart", JSON.stringify(user))
                    navigate('gameboard')
                }
            } catch (error) {
                console.log(`User creation error: ${error}`)
            }
        }
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