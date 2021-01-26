// Copyright(c) 2021 arrebole

import * as iconv from 'iconv-lite';
import { MMS, Platform } from '../src';

class MockPlatform implements Platform {
    async send() {
        return { status: '0', message: '成功', taskId: '100' };
    }
    async createTemplate() {
        return { status: '0', message: '成功', taskId: '100' };
    }
}

const mms = new MMS(new MockPlatform());

test('buildTemplate', async () => {
    const text = '测试';
    const frames = [{ txt: Buffer.from(text) }];

    const templateContent = await mms.buildTemplate(5, frames);
    expect(templateContent).toEqual(`5,txt|${iconv.decode(Buffer.from(text), 'gb2312')}`);
});

test('createTemplate', async () => {
    const text = '测试';
    const frames = [{ txt: Buffer.from(text) }];

    const templateContent = await mms.buildTemplate(5, frames);
    const createTemplateResult = await mms.createTemplate('测试', templateContent);

    expect(createTemplateResult.taskId).toBeDefined();
    expect(createTemplateResult.message).toBeDefined();
    expect(createTemplateResult.status).toBeDefined();
});

test('send', async () => {
    const text = '测试';
    const frames = [{ txt: Buffer.from(text) }];

    const templateContent = await mms.buildTemplate(5, frames);
    const createTemplateResult = await mms.createTemplate('测试', templateContent);
    const sendMMSResult = await mms.send(createTemplateResult.taskId, '181066XXXXX');
    expect(sendMMSResult.taskId).toBeDefined();
    expect(sendMMSResult.message).toBeDefined();
    expect(sendMMSResult.status).toBeDefined();
});
