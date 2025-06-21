import styles from "./gameMessage.module.css"

export default function TargetNotFoundMessage({ toggleTargetNotFoundMessage }) {
    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.messageWrapper}>
                <p className={styles.message}>Target not found!</p>
                <button className={styles.menuButton} onClick={toggleTargetNotFoundMessage}>Ok</button>
            </div>
        </>
    )
}