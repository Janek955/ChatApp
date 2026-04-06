function Room({name, icon, nowPlaying_icon}) {
    return(
        <div className="friend-room">
            <div className="room-icon">
                <img src={icon} alt="user" />
            </div>
            <div className="room-info">
                <div className="room-name">{name}</div>
                <div className="room-playing-info">
                    <div className="room-playing-info-song-icon">
                        <img src={nowPlaying_icon} alt="icon" />
                    </div>
                    <div className="room-playing-info-song-name-bar">
                        <div className="room-playing-info-song-name">Song name</div>
                        <div className="room-playing-info-song-bar">
                            <div className="room-playing-info-song-bar-progress"></div>
                        </div>
                    </div>
                    <div className="room-playing-info-song-timer">2:14</div>
                </div>
            </div>
        </div>
    );
}
export default Room;