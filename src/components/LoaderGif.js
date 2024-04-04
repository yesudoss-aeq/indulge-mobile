import React, { useRef, useEffect } from 'react';
import { Video } from 'expo-av';

const LoaderGifPlayer = () => {
    const video = useRef(null);

    useEffect(() => {
        const playVideo = async () => {
            try {
                // await video.current.loadAsync(require('../../assets/loading/Lamp_Gif_v2.mp4'), {}, false);
                await video.current.playAsync();
            } catch (error) {
                console.error('Error loading or playing video:===', error);
            }
        };

        playVideo();
    }, []);

    return (
        <Video
            ref={video}
            resizeMode='fill'
            isLooping
            style={{
                // flex: 1,
                aspectRatio: 17 / 37,
            }}
        />
    );
};

export default LoaderGifPlayer;
