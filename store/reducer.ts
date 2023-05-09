import { Store, Subtitle } from "./../types";
export const initialValues: Store = {
  isPlaying: false,
  videoProgress: 0,
  videoURL: "",
  subtitlesData: [],
  canvasCtx: undefined,
  seekTime: undefined,
};

export enum actions {
  SET_PLAYING = "setPlaying",
  SET_PAUSE = "setPause",
  SET_VIDEO_PROGRESS = "setVideoProgress",
  SET_VIDEO_URL = "setVideoUrl",
  SET_SUBTITLES = "setSubtitles",
  SET_CANVAS_CTX = "setCanvasCtx",
  SET_SEEK_TIME = "setSeekTime",
}

type Action =
  | {
      type: actions.SET_PLAYING;
    }
  | { type: actions.SET_PAUSE }
  | { type: actions.SET_SUBTITLES; payload: Subtitle[] }
  | { type: actions.SET_CANVAS_CTX; payload: Store["canvasCtx"] }
  | { type: actions.SET_VIDEO_PROGRESS; payload: Store["videoProgress"] }
  | { type: actions.SET_SEEK_TIME; payload: Store["seekTime"] }
  | { type: actions.SET_VIDEO_URL; payload: string };

export const reducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case actions.SET_PLAYING:
      return { ...state, isPlaying: true };
    case actions.SET_PAUSE:
      return { ...state, isPlaying: false };
    case actions.SET_SUBTITLES:
      return { ...state, subtitlesData: action.payload };
    case actions.SET_VIDEO_URL:
      return { ...state, videoURL: action.payload };
    case actions.SET_CANVAS_CTX:
      return { ...state, canvasCtx: action.payload };
    case actions.SET_VIDEO_PROGRESS:
      return { ...state, videoProgress: action.payload };
    case actions.SET_SEEK_TIME:
      return { ...state, seekTime: action.payload };
    default:
      return state;
  }
};
