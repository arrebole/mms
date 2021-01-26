// Copyright(c) 2021 arrebole

export interface Frame {
    media?: Buffer;
    mediaType?: 'jpg' | 'gif' | 'mp3' | 'mp4';
    txt?: Buffer;
}
