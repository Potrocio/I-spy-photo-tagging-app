import { useEffect, useState } from "react";
import styles from "./gameHUD.module.css"

export default function GameHUD({ mainMenu, targetListOpen, toggleTargetList, temporaryTargets, targetsFound, gameFinished }) {

    const [secondsCounter, setSecondsCounter] = useState(0)

    useEffect(() => {
        const rawData = localStorage.getItem("userStart");
        const userStarted = rawData ? JSON.parse(rawData) : null;

        if (!userStarted || !userStarted.gameStarted || gameFinished) {
            return;
        }

        const startedMilliSeconds = new Date(userStarted.gameStarted).getTime();

        const interval = setInterval(() => {
            const now = Date.now()
            const seconds = Math.floor((now - startedMilliSeconds) / 1000)
            setSecondsCounter(seconds)
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    const hours = Math.floor(secondsCounter / 3600);
    const mins = Math.floor((secondsCounter % 3600) / 60);
    const secs = secondsCounter % 60;

    const h = String(hours).padStart(2, '0');
    const m = String(mins).padStart(2, '0');
    const s = String(secs).padStart(2, '0');

    const listOfTargetsFound = targetsFound.map(target => {
        return target.object;
    })

    return (
        <div className={styles.gameHUDWrapper}>
            <button className={styles.menuButton} onClick={mainMenu}>Main menu</button>
            <div className={styles.counter}>{`${h}:${m}:${s}`}</div>
            <button className={styles.targetButton} onClick={toggleTargetList}>Targets</button>
            {targetListOpen &&
                <div className={styles.targetListWrapper}>
                    {temporaryTargets.map((target, index) => {
                        return <div className={listOfTargetsFound.includes(target) ? styles.targetFound : ''} key={index}>{target}</div>
                    })}
                    <button className={styles.closeButton} onClick={toggleTargetList}>Close</button>
                </div>
            }
        </div>
    )
}