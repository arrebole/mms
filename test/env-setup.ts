// Copyright(c) 2021 arrebole

import * as fs from 'fs';

// 读取环境变量文件
function loadDotenv(paths: string[]) {
    paths.forEach((path) => {
        if (!fs.existsSync(path)) return;

        const fileData = fs.readFileSync(path).toString();
        for (const line of fileData.split('\n')) {
            const result = /(\w+)=(\w+)/.exec(line.trim());
            if (result) process.env[result[1]] = result[2];
        }
    });
}

loadDotenv(['.dotenv', '../.dotenv']);
