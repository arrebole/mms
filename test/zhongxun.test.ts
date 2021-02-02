// Copyright(c) 2021 arrebole

import * as iconv from 'iconv-lite';
import { MultimediaMessage, RundaPlatform } from '../src';

const rundaPlatform = new RundaPlatform({
    appId: process.env.TEST_APPID,
    appKey: process.env.TEST_APPKEY,
});

describe('runda', () => {
    test('buildTemplate', async () => {
        const multimediaMessage = new MultimediaMessage({
            title: '测试',
            frames: [
                {
                    duration: 5,
                    files: [{ mediaType: 'txt', media: Buffer.from('测试测试') }],
                },
                {
                    duration: 5,
                    files: [{ mediaType: 'txt', media: Buffer.from('测试测试') }],
                },
            ],
        });
        expect(multimediaMessage.content).toEqual(
            `5,txt|${iconv.decode(Buffer.from('测试测试'), 'gb2312')};`.repeat(2),
        );
    });

    test('createTemplate', async () => {
        const multimediaMessage = new MultimediaMessage({
            title: '[upyun 测试]',
            frames: [
                {
                    duration: 5,
                    files: [{ mediaType: 'txt', media: Buffer.from('测试测试') }],
                },
            ],
        });
        const createTemplateResult = await rundaPlatform.create(multimediaMessage);
        expect(createTemplateResult.taskId).not.toBeNull();
    });

    test('send', async () => {
        const sendMMSResult = await rundaPlatform.send({
            templateId: process.env.TEST_SMMID,
            phone: process.env.TEST_MOBILE,
        });
        expect(sendMMSResult.taskId).not.toBeNull();
    });
});
