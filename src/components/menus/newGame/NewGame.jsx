import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./newGame.module.css"

export default function NewGame({ mainMenu }) {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;

    async function handleSubmit(e) {
        e.preventDefault();
        if (username) {
            try {
                if (username.length > 12 || username.length < 4) {
                    setMessage("Username has to be between 4 to 12 characters")
                    return
                }

                const response = await fetch(`${baseUrl}/users`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username })
                })

                if (response.status == 409) {
                    setMessage("Username already exists")
                }

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
        } else {
            setMessage("Must create a username")
        }
    }

    function handleChange(e) {
        setUsername(e.target.value)
    }

    return (
        <div className={styles.newGameMenuWrapper}>
            <button className={styles.menuButton} onClick={mainMenu}>Menu</button>

            <ul className={styles.instructions}>
                <li>Pick a unique username</li>
                <li>Hit "Begin Game"</li>
                <li>Find all the targets hidden in the image</li>
                <li>The clock starts when you begin — your time is your score</li>
                <li>Good luck!</li>
            </ul>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className={styles.input}
                    onChange={handleChange}
                    value={username}
                />
                {message && <p className={styles.message}>{message}</p>}

                <button type="submit" className={styles.beginButton}>Begin Game</button>
            </form>
        </div>
    )
}