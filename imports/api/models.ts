export interface Profile {
    phone?: string;
    picture?: string;
    actu?: string;
}
export interface User {
    _id?: string;
    username?: string;
    password?: string;
    profile?: Profile;
}

export interface Chat {
    _id?: string;
    title?: string;
    picture?: string;
    participants?: string[];
    lastMessage?: Message;
}

export interface Message {
    _id?: string;
    chatId?: string;
    content?: string;
    createAt?: Date;
    typeMessage?: MessageType;
    ownerShip? : string;
    senderId?: string;
    read?: String;
}

export enum MessageType {
    TEXTE = 'string',
    IMAGE = 'image'
}



