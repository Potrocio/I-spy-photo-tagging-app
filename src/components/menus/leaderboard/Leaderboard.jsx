import { useState } from "react"

export default function Leaderboard({ mainMenu }) {

    const scores = [
        { name: "Alice", time: 12.5 },
        { name: "Bob", time: 14.2 },
        { name: "Charlie", time: 15.1 },
        { name: "Dave", time: 17.9 },
    ];

    const [query, setQuery] = useState('')

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
                {filteredScores.map((player, index) => {
                    return <li key={index}>Player: {player.name}   Score: {player.time}</li>
                })}
            </ul>
        </div>
    )
}