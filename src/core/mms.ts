// Copyright(c) 2021 arrebole

import * as iconv from 'iconv-lite';
import { Frame } from './frame';

export class MultimediaMessage {
    constructor(options?: Partial<Record<'title', string> & Record<'frames', Frame[]>>) {
        if (options?.title) {
            this.title = options.title;
        }

        if (options?.frames) {
            this.frams = options.frames;
        } else {
            this.frams = [];
        }
    }

    title: string;

    frams: Frame[];

    // 为媒体短信添加帧
    add(...frames: Frame[]) {
        this.frams.push(...frames);
        return this;
    }

    // 将媒体短信编码为文本格式
    encode(): string {
        const result = [];
        for (const frame of this.frams) {
            const frameCtx = [frame.duration.toString()];
            for (const file of frame.files) {
                if (file.mediaType === 'txt') {
                    frameCtx.push('txt|' + iconv.decode(file.media, 'gb2312'));
                    continue;
                }
                frameCtx.push(file.mediaType + '|' + file.media.toString('base64'));
            }
            result.push(frameCtx.join(','));
        }
        return result.join(';') + ';';
    }
}
