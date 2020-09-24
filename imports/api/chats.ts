import {Mongo} from 'meteor/mongo';
import {Chat} from './models';
import moment from 'moment';

export const ChatsCollection = new Mongo.Collection<Chat>('Chats');

export const dummyChats: Chat[] = [
    {
        title: "",
        picture: "",
        participants: ["No2GXxLdwvLHAxFbK","TK3D2rGPPbkx2tLjp"],
        lastMessage: {
            content: "Slt! Comment ça va ?",
            createAt: moment()
                        .toDate()
        }
    },

    {
        title: "",
        picture: "",
        participants: ["kwPQZrStNT83GmfR3","No2GXxLdwvLHAxFbK"],
        lastMessage: {
            content: "Je vais bien et toi ?",
            createAt: moment()
                        .subtract(1,'days')
                        .toDate()
        }
    },

    {
        title: "",
        picture: "",
        participants: ["kwPQZrStNT83GmfR3","TK3D2rGPPbkx2tLjp"],
        lastMessage: {
            content: "Hello !! ",
            createAt: moment()
                        .subtract(2,'days')
                        .toDate()
        }
    }
]