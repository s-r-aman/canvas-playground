import * as React from "react";

interface ControlProps {
  playVideo: () => void;
  pauseVideo: () => void;
  progress: number;
  updateProgress: (
    seekBarRef: null | React.RefObject<HTMLDivElement>
  ) => React.MouseEventHandler<HTMLDivElement>;
}
export const Controls: React.FC<ControlProps> = ({
  playVideo,
  pauseVideo,
  updateProgress,
  progress,
}) => {
  const seekBar = React.useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        ref={seekBar}
        onClick={updateProgress(seekBar)}
        className="seek-wrapper"
      >
        <div
          className="seekbar"
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
      </div>
      <div className="mx-auto flex justify-center">
        <button
          className="border border-white w-20 py-2 rounded mx-10"
          onClick={playVideo}
        >
          Play
        </button>
        <button
          className="border border-white w-20 py-2 rounded mx-10"
          onClick={pauseVideo}
        >
          Pause
        </button>
      </div>
    </div>
  );
};
