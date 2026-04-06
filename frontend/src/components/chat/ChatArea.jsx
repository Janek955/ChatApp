import Message from "./message/Message";
import styles from "./ChatArea.module.css"

function ChatArea({ messages }) {
    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>

                <div className={styles.name}>Title</div> 
                {/* noselect */}

            </div>

            <div id="chat-messages">
                {messages.map((msg, i) => (
                    <Message key = {i} {...msg}/>
                ))}
            </div>
        </div>
    );
}

export default ChatArea;