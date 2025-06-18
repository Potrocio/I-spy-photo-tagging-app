import { useState } from "react";
import styles from "./targetSelection.module.css"

export default function TargetSelection({ toggleTargetSelectionMenu, temporaryTargets, targetSelected, setTargetSelected, toggleTargetFoundMessage, toggleTargetNotFoundMessage, toggleGameFinished, targetsFound }) {

    function handleClick(e) {
        const selected = e.target.textContent;
        setTargetSelected(selected)
    }

    function submitTargetSelected() {
        if (targetSelected) {
            toggleTargetSelectionMenu();
            const match = temporaryTargets.includes(targetSelected)
            const gameFinished = true;
            if (match) {
                // make green border of that item visible
                // If game finished load game finished menu else load target foundmenu
                if (gameFinished) {
                    // load game finished menu
                    toggleGameFinished();
                } else {
                    toggleTargetFoundMessage();
                }
            } else {
                toggleTargetNotFoundMessage();
            }
        }

    }

    const listOfTargetsFound = targetsFound.map(target => {
        return target.object;
    })

    const filteredTargets = temporaryTargets.filter((target) => {
        return !listOfTargetsFound.includes(target)
    })

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.targetSelectionWrapper}>
                <button onClick={toggleTargetSelectionMenu}>X</button>
                {filteredTargets.map((target, index) => {
                    return <div className={`${styles.targetItem} ${targetSelected === target ? styles.targetSelected : ''}`} onClick={handleClick} key={index}>{target}</div>
                })}
                <button onClick={submitTargetSelected}>Submit</button>
            </div>
        </>
    )
}