import styles from "./Actions.module.css"
import settingsIcon from "/settings_icon.svg";

function Actions() {
    return (
        <div className={styles.container}>
            <div className={styles.settings}>
                <img src={settingsIcon} alt="settings"/>
            </div>
        </div>
    );
}

export default Actions;