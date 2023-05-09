export interface Subtitle {
  start: number;
  end: number;
  text: string;
  number: number;
}

export interface Store {
  isPlaying: boolean;
  subtitlesData: Subtitle[];
  canvasCtx?: CanvasRenderingContext2D | null;
  videoURL: string;
  videoProgress: number;
  seekTime?: number;
}
