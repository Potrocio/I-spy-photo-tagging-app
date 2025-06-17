import { useNavigate } from "react-router-dom"
import styles from "./gameFinished.module.css"

export default function GameFinished({ toggleGameFinished }) {
    const navigate = useNavigate();

    function handleClick() {
        toggleGameFinished()
        navigate('/')
    }

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.menuWrapper}>
                <p>All targets found!</p>
                <p>Score: 100%</p>
                <br />
                <p>Check the leaderboard to find your rank!</p>
                <button onClick={handleClick}>Main menu</button>
            </div>
        </>
    )
}