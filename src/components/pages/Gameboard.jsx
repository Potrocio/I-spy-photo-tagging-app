import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./pages.module.css"
import GameHUD from "../gameHUD/GameHUD";
import TargetSelection from "../menus/targetSelection/TargetSelection";
import TargetFoundMessage from "../gameMessages/TargetFoundMessage";
import TargetNotFoundMessage from "../gameMessages/TargetNotFoundMessage";
import GameFinished from "../menus/gameFinished/GameFinished";
import gameImage from "../../assets/gameImage.png"


export default function Gameboard() {

    const [targetListOpen, setTargetListOpen] = useState(false)
    const [coordinates, setCoordinates] = useState({})
    const [targetSelectionMenu, setTargetSelectionMenu] = useState(false)
    const [targetSelected, setTargetSelected] = useState('')
    const [targetFoundMessage, setTargetFoundMessage] = useState(false)
    const [targetNotFoundMessage, setTargetNotFoundMessage] = useState(false)
    const [gameFinished, setGameFinished] = useState(false)
    const [targetsFound, setTargetsFound] = useState([])


    const imgRef = useRef(null);

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
        "Book",
        "Credit card",
        "Key",
        "Sunglasses",
        "Mirror",
        "Cross",
        "Crystal ball",
        "Gear",
        "Microscope",
        "Toolbox",
        "Shield",
        "Capybara",
    ]

    function handleImageClick(e) {
        if (!targetSelectionMenu) {
            setTargetSelectionMenu(prev => !prev)
            setTargetSelected('')
            const img = imgRef.current;
            const rect = img.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const normalizedX = x / rect.width;
            const normalizedY = y / rect.height;

            setCoordinates({
                x: normalizedX,
                y: normalizedY,
            })
        }
    }

    function toggleGameFinished() {
        setGameFinished(prev => !prev)
    }

    return (
        <div className={styles.gameboardWrapper}>

            <GameHUD
                mainMenu={mainMenu}
                targetListOpen={targetListOpen}
                toggleTargetList={toggleTargetList}
                temporaryTargets={temporaryTargets}
                targetsFound={targetsFound}
                gameFinished={gameFinished}
            />
            <div className={styles.imageWrapper}>
                <img ref={imgRef} onClick={handleImageClick} className={styles.gameImage} src={gameImage} alt="I spy image" />
                {targetsFound.length > 0 && targetsFound.map((target, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: `${target.xMin * 100}%`,
                            top: `${target.yMin * 100}%`,
                            width: `${(target.xMax - target.xMin) * 100}%`,
                            height: `${(target.yMax - target.yMin) * 100}%`,
                            border: "2px solid limegreen",
                            pointerEvents: "none",
                            boxSizing: "border-box",
                        }}
                    />
                ))}

            </div>
            {targetSelectionMenu &&
                <TargetSelection
                    toggleTargetSelectionMenu={toggleTargetSelectionMenu}
                    temporaryTargets={temporaryTargets}
                    targetSelected={targetSelected}
                    setTargetSelected={setTargetSelected}
                    toggleTargetFoundMessage={toggleTargetFoundMessage}
                    toggleTargetNotFoundMessage={toggleTargetNotFoundMessage}
                    toggleGameFinished={toggleGameFinished}
                    targetsFound={targetsFound}
                    coordinates={coordinates}
                    setTargetsFound={setTargetsFound}
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

// coordinates are X = 0 33 67 100
// y = 23 50 75