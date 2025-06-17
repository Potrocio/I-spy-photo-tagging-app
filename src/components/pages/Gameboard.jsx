import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./pages.module.css"
import GameHUD from "../gameHUD/GameHUD";
import TargetSelection from "../menus/targetSelection/TargetSelection";
import TargetFoundMessage from "../gameMessages/TargetFoundMessage";
import TargetNotFoundMessage from "../gameMessages/TargetNotFoundMessage";
import GameFinished from "../menus/gameFinished/GameFinished";

export default function Gameboard() {

    const [targetListOpen, setTargetListOpen] = useState(false)
    const [targetSelectionMenu, setTargetSelectionMenu] = useState(false)
    const [targetSelected, setTargetSelected] = useState('')
    const [targetFoundMessage, setTargetFoundMessage] = useState(false)
    const [targetNotFoundMessage, setTargetNotFoundMessage] = useState(false)
    const [gameFinished, setGameFinished] = useState(false)

    // const [targetFound, setTargetFound] = useState(false)

    const navigate = useNavigate();

    function mainMenu() {
        navigate('/')
    }

    function toggleTargetList() {
        setTargetListOpen(prev => !prev)
    }

    function toggleTargetSelectionMenu() {
        setTargetSelectionMenu(prev => !prev)
    }

    function toggleTargetFoundMessage() {
        setTargetFoundMessage(prev => !prev)
    }

    function toggleTargetNotFoundMessage() {
        setTargetNotFoundMessage(prev => !prev)
    }

    const temporaryTargets = [
        "hat",
        "coat",
        "apple",
        "orange",
    ]

    function handleImageClick() {
        if (!targetSelectionMenu) {
            setTargetSelectionMenu(prev => !prev)
            setTargetSelected('')
        }
    }

    function toggleGameFinished() {
        setGameFinished(prev => !prev)
    }

    const temporaryTimer = "5m 3s"

    return (
        <div className={styles.gameboardWrapper}>
            <GameHUD
                mainMenu={mainMenu}
                targetListOpen={targetListOpen}
                toggleTargetList={toggleTargetList}
                temporaryTargets={temporaryTargets}
                temporaryTimer={temporaryTimer}
            />
            <img onClick={handleImageClick} className={styles.gameImage} src="https://images.pexels.com/photos/906055/pexels-photo-906055.jpeg?_gl=1*1yzk34i*_ga*MjU2MzY2OTIuMTcxMzA2NjYyNg..*_ga_8JE65Q40S6*czE3NTAxMjMyNzUkbzEzJGcxJHQxNzUwMTIzMjk5JGozNiRsMCRoMA.." alt="I spy image" />
            {targetSelectionMenu &&
                <TargetSelection
                    toggleTargetSelectionMenu={toggleTargetSelectionMenu}
                    temporaryTargets={temporaryTargets}
                    targetSelected={targetSelected}
                    setTargetSelected={setTargetSelected}
                    toggleTargetFoundMessage={toggleTargetFoundMessage}
                    toggleTargetNotFoundMessage={toggleTargetNotFoundMessage}
                    toggleGameFinished={toggleGameFinished}
                />}
            {targetFoundMessage &&
                <TargetFoundMessage
                    toggleTargetFoundMessage={toggleTargetFoundMessage}
                />}
            {targetNotFoundMessage &&
                <TargetNotFoundMessage
                    toggleTargetNotFoundMessage={toggleTargetNotFoundMessage}
                />}
            {gameFinished &&
                <GameFinished
                    toggleGameFinished={toggleGameFinished}
                />}
        </div>
    )
}