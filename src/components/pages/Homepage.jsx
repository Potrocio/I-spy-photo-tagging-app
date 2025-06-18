import MainMenu from "../menus/mainMenu/MainMenu"
import styles from "./pages.module.css"

export default function Homepage() {
    return (
        <div className={styles.homePageWrapper}>
            <MainMenu />
        </div>
    )
}