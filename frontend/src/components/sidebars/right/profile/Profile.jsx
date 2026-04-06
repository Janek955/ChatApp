import Actions from "./actions/Actions";
import UserInfo from "./user_info/UserInfo";

function Profile({ nick }) {
    return (
        <div id="profile-window">
            <div id="player-window-user-info">
                <UserInfo nick={nick} profilePicture={"frontend/src/assets/bedzieszmoja.png"}/>
            </div>
            <div id="profile-window-nav" className="noselect">
                <Actions />
            </div>
        </div>
    );
}

export default Profile;