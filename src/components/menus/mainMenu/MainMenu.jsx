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
            {menu == "Main" ?
                (<div className={styles.mainMenuWrapper}>
                    <button onClick={loadLeaderboard}>Leaderboard</button>
                    <button onClick={loadNewGame}>New Game</button>
                </div>)
                : menu == "Leaderboard" ?
                    (<Leaderboard mainMenu={mainMenu} />)
                    :
                    (<NewGame mainMenu={mainMenu} />)
            }
        </>
    )
}