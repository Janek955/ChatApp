import { useState } from "react"



function MessageText({ nick, type = "text", content, avatar = "assets/user.png" }) {
    const [selectedImage, setSelectedImage] = useState(null);
    
    return (
        <>
        <div className="message">

            <div className="profile-picture">
                <img src={avatar} alt="profile" class="noselect" />
            </div>

            <div className="message-nick">{nick}</div>
            <div className="message-spacing"></div>

            {/* CONTENT */}
            <div className="message-content">
                {/* TEXT */}
                {type === "text" && (
                    <div>{content}</div>
                )}

                {/* IMAGE */}
                {type === "image" && (
                    <img
                        src={content}
                        className="message-content-image noselect"
                        onClick={() => selectedImage(content)}
                        alt="img"
                    />
                )}

            </div>
        </div>
        {selectedImage && (
            <div
                className="image-viewer"
                onClick = {() => setSelectedImage(null)}
            >
                <img
                    src={selectedImage}
                    style={{ maxWidth: "90%", maxHeight: "90%"}}
                />
            </div>
        )}
        </>
    );
}

export default MessageText;