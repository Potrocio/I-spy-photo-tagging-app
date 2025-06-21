import { useState } from "react"
import Leaderboard from "../leaderboard/Leaderboard"
import NewGame from "../newGame/NewGame"
import styles from "./mainMenu.module.css"

export default function MainMenu() {
    const [menu, setMenu] = useState("Main")

    function mainMenu() {
        setMenu("Main")
    }

    function loadLeaderboard() {
        setMenu("Leaderboard")
    }

    function loadNewGame() {
        setMenu("New Game")
    }
    return (
        <>
            {menu === "Main" ? (
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>Photo Tagging App</h1>

                    <div className={styles.mainMenuWrapper}>
                        <button className={styles.menuButton} onClick={loadLeaderboard}>Leaderboard</button>
                        <button className={styles.menuButton} onClick={loadNewGame}>New Game</button>
                    </div>
                </div>
            ) : menu === "Leaderboard" ? (
                <Leaderboard mainMenu={mainMenu} />
            ) : (
                <NewGame mainMenu={mainMenu} />
            )}
        </>
    )
}