import styles from "./gameMessage.module.css"

export default function TargetFoundMessage({ toggleTargetFoundMessage }) {

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.messageWrapper}>
                <p>Target Found!</p>
                <button onClick={toggleTargetFoundMessage}>Ok</button>
            </div>
        </>
    )
}