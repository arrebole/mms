# Multimedia Messaging Service

## install
```bash
npm install @arrebole/mms
```

# example
```javascript
const { MMS, ZhongXunPlatform } = requir('@arrebole/mms');

const mms = new MMS(new ZhongXunPlatform({ appId, appKey }));

async function sendMMS() {
    const templateTitle = 'test';
    const templateContent = await mms.buildTemplateContent(5, frames);

    // create template
    const createTemplateResult = await mms.createTemplate(templateTitle, templateContent);

    // send message
    const sendMMSResult = await mms.send(createTemplateResult.taskId, '181066XXXXX');
}

```