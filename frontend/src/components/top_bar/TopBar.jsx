import styles from "./TopBar.module.css"

function TopBar() {
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                {/* <div id="app-name">appName</div> */}
                appName
            </div>
            <div id="top-bar-nav-search">
                    {/* <input type="text" placeholder="Search"> */}
            </div>
        </div>
    );
}

export default TopBar;