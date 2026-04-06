import picture from "/bedzieszmoja.png";

function UserInfo({nick, profilePicture = picture}) {
    return (
        <>
        <div className="picture">
            <img src={profilePicture} alt="picture" />
        </div>
        <div className="nick" >{nick}</div>
        </>
    );
}

export default UserInfo;