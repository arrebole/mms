// Copyright(c) 2021 arrebole

import axios from 'axios';
import { MMS, Platform, SendMMSOptions } from './interface';

export class RundaPlatform implements Platform {
    constructor(options: Record<'appId' | 'appKey', string> & Partial<Record<'sendUrl' | 'createUrl', string>>) {
        this.secret = options;
        this.apiUrl = {
            send: options.sendUrl ?? 'http://rcs.zhongxunrunda.com/mmsApi/2m/send',
            create: options.createUrl ?? 'http://rcs.zhongxunrunda.com/mmsApi/2m/create',
        };
    }

    private readonly secret: Record<'appId' | 'appKey', string>;
    private readonly apiUrl: Record<'send' | 'create', string>;

    private makeFormDate(data: { [key: string]: string | null | undefined }) {
        const form = [];
        const entity = { ...this.secret, ...data };
        for (const key of Reflect.ownKeys(entity)) {
            if (entity[<string>key]) form.push(`${<string>key}=${entity[<string>key]}`);
        }
        return form.join('&');
    }

    private post(url: string, data: any) {
        return axios.post(url, data).then((r) => ({
            status: r.data.returnStatus,
            message: r.data.message,
            taskId: r.data.taskId,
        }));
    }

    send(options: SendMMSOptions) {
        return this.post(
            this.apiUrl.send,
            this.makeFormDate({
                mmsId: options.templateId,
                phone: options.phone,
                sendTime: options.sendTime,
            }),
        );
    }

    create(mms: MMS) {
        return this.post(
            this.apiUrl.create,
            this.makeFormDate({
                title: mms.title,
                content: mms.content,
            }),
        );
    }
}
