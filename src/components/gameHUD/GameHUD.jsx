import styles from "./gameHUD.module.css"

export default function GameHUD({ mainMenu, targetListOpen, toggleTargetList, temporaryTargets, temporaryTimer }) {
    return (
        <div className={styles.gameHUDWrapper}>
            <button className="backToMenu" onClick={mainMenu}>Main menu</button>
            <div className="counter">{temporaryTimer}</div>
            <button onClick={toggleTargetList}>Targets</button>
            {targetListOpen &&
                <div className="targetListWrapper">
                    {temporaryTargets.map((target, index) => {
                        return <div key={index}>{target}</div>
                    })}
                    <button onClick={toggleTargetList}>Close</button>
                </div>
            }
        </div>
    )
}