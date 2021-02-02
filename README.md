# Multimedia Messaging Service

## install
```bash
npm install @arrebole/mms
```

# example
```javascript
const { MultimediaMessage, RundaPlatform } = requir('@arrebole/mms');

const rundaPlatform = new RundaPlatform({
    appId: APPID,
    appKey: TEST_APPKEY,
});

async function sendMMS() {
    const multimediaMessage = new MultimediaMessage({
        title: '[upyun 测试]',
        frames: [
            {
                duration: 5,
                files: [{ mediaType: 'txt', media: Buffer.from('测试测试') }],
            },
        ],
    });

    // create template
    const createTemplateResult = await rundaPlatform.create(multimediaMessage);

    // send message
    const sendMMSResult = await rundaPlatform.send({
        templateId: createTemplateResult.taskId, 
        phone: '181066XXXXX'
    });
}

```