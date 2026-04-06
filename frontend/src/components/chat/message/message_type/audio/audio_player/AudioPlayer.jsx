import { useRef, useState } from "react";
import styles from "./AudioPlayer.module.css"

export default function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio.duration) return;

        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
    };

    return (
        <div className={styles.container}>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
            />
            <button className={styles.playButton}>
                <image src="frontend\src\assets\play-button-arrowhead.svg"/>
            </button>

            <div className={styles.progress}>
                <div
                    className={styles.progressBar}
                    style={{transform: `scaleX(${progress / 100})`}}
                />
            </div>
            <div className={styles.timer}> 0:00 / 0:00 </div>

        </div>
    );
}