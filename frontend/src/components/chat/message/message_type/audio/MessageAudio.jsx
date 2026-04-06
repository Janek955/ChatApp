import AudioPlayer from "./audio_player/AudioPlayer";


function MessageAudio({content}) {
    return (
        <div className="message-audio noselect">
            <AudioPlayer src={content} />
        </div>
    );
}

export default MessageAudio;