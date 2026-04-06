import Profile from "./profile/Profile";

function SideBarRight( { nick }) {
    return (
        <div id="side-bar-right">
            <div id="player-window" className="noselect">
                <div id="room-top-bar">
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
            <Profile nick={nick}/>
        </div>
    );
}

export default SideBarRight;