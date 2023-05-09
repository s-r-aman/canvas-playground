"use client";
import * as React from "react";
import { parseSRT } from "./../utils/convertSrtToJson";
import { Controls } from "@/components/Controls";
import { UploadOptions } from "@/components/UploadOptions";
import { Video } from "@/components/Video";
import { actions, initialValues, reducer } from "@/store/reducer";

export default function Home() {
  const [
    { seekTime, isPlaying, videoProgress, videoURL, subtitlesData },
    dispatch,
  ] = React.useReducer(reducer, initialValues);

  const playVideo = () => dispatch({ type: actions.SET_PLAYING });
  const pauseVideo = () => dispatch({ type: actions.SET_PAUSE });

  // function to update the progress of the video when user changes the seek time.
  // 1. Calculate clicked position by taking the offset in account
  // 2. update global state which will trigger the video current time update
  const updateVideoProgress: (
    seekBarRef: React.RefObject<HTMLDivElement> | null
  ) => React.MouseEventHandler<HTMLDivElement> = (seekBarRef) => (e) => {
    const pos = e.pageX - (seekBarRef?.current?.offsetLeft || 0);
    // total widht is currently static, that's why we have static number here.
    const progress = (pos / 1000) * 100;
    dispatch({ type: actions.SET_SEEK_TIME, payload: progress });
  };

  // set the video url when user selects the video
  const handleVideoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      dispatch({ type: actions.SET_VIDEO_URL, payload: fileURL });
    }
  };

  // set the subtitle data when user selects the subtitle
  const handleSrtChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a file reader object
      const reader = new FileReader();
      // Set a callback function to handle the file load event
      reader.onload = (event: ProgressEvent<FileReader>) => {
        // Get the contents of the file
        const fileContents = event.target?.result as string;
        // parse the subtitle in json
        const subtitles = parseSRT(fileContents);
        dispatch({ type: actions.SET_SUBTITLES, payload: subtitles });
      };
      // Read the selected file as text
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <UploadOptions
        handleVideoChange={handleVideoChange}
        handleSrtChange={handleSrtChange}
      />
      <Video
        videoURL={videoURL}
        subtitlesData={subtitlesData}
        setVideoProgress={(time) =>
          dispatch({ type: actions.SET_VIDEO_PROGRESS, payload: time })
        }
        isPlaying={isPlaying}
        seekProgress={seekTime}
      />
      <Controls
        playVideo={playVideo}
        pauseVideo={pauseVideo}
        updateProgress={updateVideoProgress}
        progress={videoProgress}
      />
    </div>
  );
}
