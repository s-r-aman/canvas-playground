import { Subtitle } from "@/types";
import * as React from "react";

interface VideoProps {
  videoURL?: string;
  setVideoProgress: (time: number) => void;
  subtitlesData: Subtitle[];
  isPlaying: boolean;
  seekProgress?: number;
}

export const Video: React.FC<VideoProps> = (props) => {
  const { isPlaying, setVideoProgress, subtitlesData, videoURL, seekProgress } =
    props;
  const canvasEl = React.useRef<null | HTMLCanvasElement>(null);
  const videoEl = React.useRef<null | HTMLVideoElement>(null);
  const [canvasCtx, setCanvasCtx] = React.useState<
    null | undefined | CanvasRenderingContext2D
  >(null);

  // set the context and time update listener on mount that will update the video progress in global state.
  React.useEffect(() => {
    const ctx = canvasEl.current?.getContext("2d");
    setCanvasCtx(ctx);
    const updateProgress = () => {
      const currentTime = videoEl.current?.currentTime;
      const totalTime = videoEl.current?.duration;
      if (currentTime && totalTime) {
        setVideoProgress((currentTime / totalTime) * 100);
      }
    };
    videoEl?.current?.addEventListener("timeupdate", updateProgress);
    return () => {
      videoEl.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  // start painting on canvas when user starts playing.
  React.useEffect(() => {
    if (isPlaying) {
      videoEl?.current?.play();
      updateCanvas();
    } else {
      videoEl?.current?.pause();
    }
  }, [isPlaying]);

  const updateCanvas = () => {
    if (videoEl?.current && canvasCtx) {
      const videoHeight = videoEl.current.videoHeight;
      const videoWidht = videoEl.current.videoWidth;
      // clear the canvas before painting again.
      canvasCtx.clearRect(0, 0, 1000, 500);

      canvasCtx.drawImage(videoEl.current, 0, 0, videoWidht, videoHeight);

      // add subtitles
      if (videoEl.current.currentTime) {
        const subtitle = subtitlesData.find(function (subtitle) {
          return (
            (videoEl?.current?.currentTime as number) >= subtitle.start &&
            (videoEl?.current?.currentTime as number) < subtitle.end
          );
        });
        if (subtitle) {
          canvasCtx.font = "bold 20px Arial";
          canvasCtx.textAlign = "center";
          canvasCtx.fillStyle = "white";
          canvasCtx.fillText(subtitle.text, 500, 500);
        }
      }
    }
    // paint again to keep the process going.
    requestAnimationFrame(updateCanvas);
  };

  // update seek progress once it is set by the user
  React.useEffect(() => {
    if (seekProgress) {
      if (videoEl.current) {
        // Calculate the time position based on the progress percentage
        const timePosition = (seekProgress / 100) * videoEl.current?.duration;

        // Set the current time of the video element to the calculated position
        videoEl.current.currentTime = timePosition;
      }
    }
  }, [seekProgress]);

  return (
    <div>
      <video ref={videoEl} src={videoURL} />
      <canvas height="560" width="1000" className="mx-auto" ref={canvasEl} />
    </div>
  );
};
