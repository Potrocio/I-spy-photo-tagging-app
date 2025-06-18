import styles from "./gameHUD.module.css"

export default function GameHUD({ mainMenu, targetListOpen, toggleTargetList, temporaryTargets, temporaryTimer, targetsFound }) {

    const listOfTargetsFound = targetsFound.map(target => {
        return target.object;
    })

    return (
        <div className={styles.gameHUDWrapper}>
            <button className={styles.menuButton} onClick={mainMenu}>Main menu</button>
            <div className={styles.counter}>{temporaryTimer}</div>
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