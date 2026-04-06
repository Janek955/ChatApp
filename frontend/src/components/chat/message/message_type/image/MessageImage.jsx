import { useState } from "react"


function MessageImage({ content }) {

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        
        <div className="message-content">
            <img
                src={content}
                className="message-content-image"
                onClick={() => {}}
                alt="img"
            />
        </div>
    );
}

export default MessageImage;