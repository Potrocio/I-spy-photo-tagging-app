import styles from "./gameMessage.module.css"

export default function TargetNotFoundMessage({ toggleTargetNotFoundMessage }) {
    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.messageWrapper}>
                <p>Target not found!</p>
                <button onClick={toggleTargetNotFoundMessage}>Ok</button>
            </div>
        </>
    )
}