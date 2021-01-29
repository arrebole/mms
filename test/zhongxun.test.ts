// Copyright(c) 2021 arrebole

import * as iconv from 'iconv-lite';
import { MMS, ZhongXunPlatform } from '../src';

const mms = new MMS(
    new ZhongXunPlatform({
        appId: process.env.TEST_APPID,
        appKey: process.env.TEST_APPKEY,
    }),
);

describe('ZhongXun', () => {
    test('buildTemplate', async () => {
        const text = '测试';
        const frames = [{ txt: Buffer.from(text) }];

        const templateContent = await mms.buildTemplateContent(5, frames);
        expect(templateContent).toEqual(`5,txt|${iconv.decode(Buffer.from(text), 'gb2312')}`);
    });

    test('createTemplate', async () => {
        const text = '这是一条测试短信';
        const frames = [{ txt: Buffer.from(text) }];

        const templateContent = await mms.buildTemplateContent(5, frames);
        const createTemplateResult = await mms.createTemplate('[upyun 测试]', templateContent);
        expect(createTemplateResult.taskId).not.toBeNull();
    });

    test('send', async () => {
        const sendMMSResult = await mms.send(process.env.TEST_SMMID, process.env.TEST_MOBILE);
        expect(sendMMSResult.taskId).not.toBeNull();
    });
});
