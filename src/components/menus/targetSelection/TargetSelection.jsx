import styles from "./targetSelection.module.css"

export default function TargetSelection({ toggleTargetSelectionMenu, temporaryTargets, targetSelected, setTargetSelected, toggleTargetFoundMessage, toggleTargetNotFoundMessage, toggleGameFinished, targetsFound, coordinates, setTargetsFound }) {

    function handleClick(e) {
        const selected = e.target.textContent;
        setTargetSelected(selected)
    }

    async function submitTargetSelected() {
        if (targetSelected) {
            try {
                toggleTargetSelectionMenu();
                const response = await fetch(`http://localhost:4044/targets/${targetSelected}/verify`, {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(coordinates),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`)
                }
                const { match } = await response.json()

                if (match !== false) {
                    setTargetsFound(prev => {
                        const updatedState = [...prev, match]

                        const gameFinished = updatedState.length === 12;

                        if (gameFinished) {
                            // load game finished menu
                            toggleGameFinished();
                        } else {
                            toggleTargetFoundMessage();
                            console.log('hi')
                        }
                        return updatedState
                    })
                } else {
                    toggleTargetNotFoundMessage();
                }

            } catch (error) {
                console.log("Submit target error:", error)
            }
        }
    }

    const listOfTargetsFound = targetsFound.map(target => {
        return target.name;
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