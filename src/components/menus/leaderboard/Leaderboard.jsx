import { useEffect, useState } from "react"

export default function Leaderboard({ mainMenu }) {

    const [scores, setScores] = useState([])
    const [query, setQuery] = useState('')


    // const scores = [
    //     { name: "Alice", time: 12.5 },
    //     { name: "Bob", time: 14.2 },
    //     { name: "Charlie", time: 15.1 },
    //     { name: "Dave", time: 17.9 },
    // ];

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
        player.name.toLowerCase().startsWith(query.toLowerCase())
    );



    function handleChange(e) {
        setQuery(e.target.value)
    }

    return (
        <div className="leaderboardMenuWrapper">
            <button onClick={mainMenu}>Menu</button>
            <p>Ranks</p>
            <input type="text"
                placeholder="Search by username..."
                value={query}
                onChange={handleChange}
            />
            <ul>
                {scores.length === 0 && <li>No scores to display...</li>}

                {scores.length > 0 && filteredScores.length === 0 && (
                    <li>No players match your search.</li>
                )}

                {filteredScores.length > 0 &&
                    filteredScores.map((player, index) => (
                        <li key={index}>Player: {player.name} Score: {player.time}</li>
                    ))}
            </ul>
        </div>
    )
}