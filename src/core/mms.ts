// Copyright(c) 2021 arrebole

import { Platform } from '../platform/interface';
import { Frame } from './interface';
import * as iconv from 'iconv-lite';

export class MMS {
    constructor(private platform: Platform) {}

    // 创建短信模板
    async buildTemplate(duration: number, content: Frame[]) {
        const templateContents = [duration.toString()];
        for (const frame of content) {
            // 一帧中可以包含媒体内容和纯文本
            const templateContent = [];
            if (frame.media) {
                templateContent.push(frame.mediaType + '|' + frame.media.toString('base64'));
            }
            if (frame.txt) {
                templateContent.push('txt|' + iconv.decode(frame.txt, 'gb2312'));
            }
            templateContents.push(templateContent.join(','));
        }
        return templateContents.join(',');
    }

    async createTemplate(title: string, content: string) {
        return this.platform.createTemplate(title, content);
    }

    // 通过短信模板发送信息
    send(templateId: string, phone: string, sendTime?: Date) {
        return this.platform.send({ templateId, phone, sendTime: sendTime?.toISOString() });
    }
}
