import { useEffect, useState } from "react"
import styles from "./leaderboard.module.css"

export default function Leaderboard({ mainMenu }) {

    const [scores, setScores] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:4044/users/scores', {
                    method: "GET",
                    mode: "cors",
                })

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`)
                }

                const data = await response.json();
                setScores(data)
            } catch (error) {
                console.log("Error fetching user:", error)
            }
        }

        fetchData();
    }, [])

    const filteredScores = scores.filter(player =>
        player.username.toLowerCase().startsWith(query.toLowerCase())
    );

    const rankedFilteredScores = filteredScores.sort((a, b) => a.score - b.score)

    function handleChange(e) {
        setQuery(e.target.value)
    }

    return (
        <div className={styles.contentWrapper}>
            <button onClick={mainMenu} className={styles.menuButton}>Menu</button>
            <p className={styles.title}>Ranks</p>
            <input className={styles.searchBar} type="text"
                placeholder="Search by username..."
                value={query}
                onChange={handleChange}
            />
            <ul className={styles.rankList}>
                {scores.length === 0 && <li className={styles.message}>No scores to display...</li>}

                {scores.length > 0 && rankedFilteredScores.length === 0 && (
                    <li className={styles.message}>No players match your search.</li>
                )}

                <div className={styles.rankHeader}>
                    <div className={styles.headerUsername}>Username</div>
                    <div className={styles.headerScore}>Score</div>
                </div>

                {rankedFilteredScores.length > 0 &&
                    rankedFilteredScores.map((player, index) => (
                        <li key={index} className={styles.rankCard}>
                            <div className={styles.playerName}>{player.username}</div>
                            <div className={styles.playerScore}>{player.score}</div>
                        </li>
                    ))}
            </ul>
        </div>
    )
}