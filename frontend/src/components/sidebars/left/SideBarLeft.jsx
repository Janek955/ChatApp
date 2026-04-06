import styles from "./SideBarLeft.module.css"

function SideBarLeft({rooms}) {
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                    {/* <!-- <input type="text" placeholder="Search"> --> */}
                    <div className={styles.rooms}>
                        ROOMS
                    </div>
                    <div className={styles.playLists}>
                        PLAY LISTS
                    </div>
                    <div className={styles.friends}>
                        FRIENDS
                    </div>
                </div>
            <div id="rooms-container" className="noselect">
                <div id="friends-rooms">
                    <div id="friends-rooms-title" className="noselect">
                        Friends rooms
                        {/* <!-- <div id="friends-rooms-title-spacing"></div> --> */}
                    </div>
                    <div id="friends-rooms-container">
                        {/* <!-- <div class="friend-room">
                            <div class="room-icon">
                                <img src="assets/user.png" alt="user">
                            </div>
                            <div class="room-info">
                                <div class="room-name">user's Room</div>
                                <div class="room-playing-info">
                                    <div class="room-playing-info-song-icon">
                                        <img src="assets/bedzieszmoja.png" alt="icon">
                                    </div>
                                    <div class="room-playing-info-song-name-bar">
                                        <div class="room-playing-info-song-name">Song name</div>
                                        <div class="room-playing-info-song-bar">
                                            <div class="room-playing-info-song-bar-progress"></div>
                                        </div>
                                    </div>
                                    <div class="room-playing-info-song-timer">2:14</div>
                                </div>
                            </div>
                        </div>
                        --> */}
                        <button id="add_room_btn" onClick={() => { console.log("Left SideBar works")}}>add room</button>
                    </div>
                </div>
                
                <div id="radios" className="noselect">
                    <div id="radios-rooms-title" className="noselect">RADIO</div>
                </div>
                    <div id="radios-container">

                    </div>
                
            </div>
        </div>
    );
}

export default SideBarLeft;

