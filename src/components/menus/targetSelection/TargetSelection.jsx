import styles from "./targetSelection.module.css"

export default function TargetSelection({ toggleTargetSelectionMenu, temporaryTargets, targetSelected, setTargetSelected, toggleTargetFoundMessage, toggleTargetNotFoundMessage, toggleGameFinished, targetsFound, coordinates, setTargetsFound }) {

    function handleClick(e) {
        const selected = e.target.textContent;
        setTargetSelected(selected)
    }

    const baseUrl = import.meta.env.VITE_API_URL;

    async function submitTargetSelected() {
        if (targetSelected) {
            try {
                toggleTargetSelectionMenu();
                const response = await fetch(`${baseUrl}/targets/${targetSelected}/verify`, {
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
                    const updatedState = [...targetsFound, match]
                    setTargetsFound(updatedState)
                    const gameFinished = updatedState.length === 12;

                    if (gameFinished) {
                        // load game finished menu
                        try {
                            const userStart = JSON.parse(localStorage.getItem("userStart"))
                            const response = await fetch(`${baseUrl}/users/${userStart.id}`, {
                                method: "PATCH",
                                mode: "cors",
                            })

                            if (!response.ok) {
                                throw new Error(`Game finished attempt error: ${response.status}`)
                            }

                            const user = await response.json();
                            localStorage.setItem("user", JSON.stringify(user))
                            toggleGameFinished();
                        } catch (error) {
                            console.log("Error updating score:", error)
                        }
                    } else {
                        //This displays a menu for when the target is found
                        //I am commenting it out until further review
                        //Due to questionable UX
                        // toggleTargetFoundMessage();
                    }

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
                <button onClick={toggleTargetSelectionMenu} className={styles.closeMenu}>X</button>
                {filteredTargets.map((target, index) => {
                    return <div className={`${styles.targetItem} ${targetSelected === target ? styles.targetSelected : ''}`} onClick={handleClick} key={index}>{target}</div>
                })}
                <button className={styles.submitButton} onClick={submitTargetSelected}>Submit</button>
            </div>
        </>
    )
}