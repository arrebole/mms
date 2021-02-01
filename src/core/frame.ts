// Copyright(c) 2021 arrebole

export interface FrameFile {
    media: Buffer;
    mediaType: 'jpg' | 'gif' | 'mp4' | 'mp3' | 'txt';
}

export class Frame {
    duration: number;
    files: FrameFile[];
}
