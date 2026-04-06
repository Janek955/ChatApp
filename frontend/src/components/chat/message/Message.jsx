import MessageImage from "./message_type/image/MessageImage";
import MessageText from "./message_type/text/MessageText";
import MessageAudio from "./message_type/audio/MessageAudio";


function Message ({nick, type = "text", content, avatar = "assets/user.png"}) {
    
    const renderContent = () => {
        if (type === "text") {
            return <MessageText content={content}/>
        }
        if (type === "image") {
            return <MessageImage content={content}/>
        }
        if (type === "audio") {
            return <MessageAudio content={content}/>
        }
    }
    
    return (
        <div className="message">

            <div className="profile-picture">
                <img src={avatar} alt="profile" class="noselect" />
            </div>

            <div className="message-nick">{nick}</div>
            <div className="message-spacing"></div>
            <div className="message-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Message;