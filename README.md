# Multimedia Messaging Service

## install
```bash
npm install @arrebole/mms
```

# example
build mms
```javascript
const { MultimediaMessage } = requir('@arrebole/mms');

const multimediaMessage = new MultimediaMessage({
    title: '[upyun 测试]',
    frames: [
        {
            duration: 5,
            files: [
                { mediaType: 'txt', media: Buffer.from('测试测试') }
            ],
        },
        {
            duration: 6,
            files: [
                { mediaType: 'txt', media: Buffer.from('测试测试2') }
            ],
        },
    ],
});

// => 5,txt|测试测试;6,txt|测试测试2
console.log(multimediaMessage.content);

```

send mms
```javascript
const { RundaPlatform } = requir('@arrebole/mms');

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