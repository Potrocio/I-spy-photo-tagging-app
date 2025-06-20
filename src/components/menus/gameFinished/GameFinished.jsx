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
                <p>All targets found!</p>
                <p>Score: {`${h}:${m}:${s}`}</p>
                <br />
                <p>{user.username} check the leaderboard to find your rank!</p>
                <button onClick={handleClick}>Main menu</button>
            </div>
        </>
    )
}