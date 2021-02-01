// Copyright(c) 2021 arrebole

export interface SendMMSOptions {
    templateId: string;
    phone: string;
    sendTime?: string;
}

export interface MMS {
    title: string;
    encode(): string;
}

export interface Response {
    status: string;
    message: string;
    taskId: string | null;
}

export interface Platform {
    create(MMS): Promise<Response>;
    send(option: SendMMSOptions): Promise<Response>;
}
