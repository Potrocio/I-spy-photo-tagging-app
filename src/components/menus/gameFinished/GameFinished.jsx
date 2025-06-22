import { useNavigate } from "react-router-dom"
import styles from "./gameFinished.module.css"

export default function GameFinished({ toggleGameFinished }) {
    const navigate = useNavigate();

    function handleClick() {
        localStorage.removeItem("user")
        toggleGameFinished()
        navigate('/')
    }

    const user = JSON.parse(localStorage.getItem("user"))

    const hours = Math.floor(user.score / 3600);
    const mins = Math.floor((user.score % 3600) / 60);
    const secs = user.score % 60;

    const h = String(hours).padStart(2, '0');
    const m = String(mins).padStart(2, '0');
    const s = String(secs).padStart(2, '0');

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.menuWrapper}>
                <p className={styles.title}>All targets found!</p>
                <div className={styles.messageWrapper}>
                    <p className={styles.message}>{user.username} check the leaderboard to find your rank!</p>
                    <p className={styles.scoreDisplay}>Score: {`${h}:${m}:${s}`}</p>
                </div>
                <button className={styles.mainMenuButton} onClick={handleClick}>Main menu</button>
            </div>
        </>
    )
}