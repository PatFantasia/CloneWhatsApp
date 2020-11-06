import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

import {User, Chat, Message} from './models';
import {ChatsCollection} from './chats';
import {MessagesCollection} from './messages';
import { ImagesCollection } from './images';

// manage users
export const createDummyUsers = (users: User[]): void => {
    users.forEach(user => {
        const {username, password, profile } = user;
        Accounts.createUser({
            username,
            password,
            profile 
        });
    });
};

// manage chats
export const createDummyChats = (chats: Chat[]): void => {
    chats.forEach(chat =>{
        ChatsCollection.insert(chat);
    });
};
export const findChats = ():Chat[] => {
    return ChatsCollection.find().fetch()
    .map(ChatCollection => {
        const otherUserid = findOtherId (ChatCollection.participants);
        // console.log("otherUserId : ", otherUserid);
        
        const { username, profile}  = findOtherUser(otherUserid);
        // console.log('username :', username);
        // console.log('picture : ', profile.picture);
        const lastMessage = findLastMessage(ChatCollection._id)
        return {
            ...ChatCollection,
            title: username,
            picture: profile.picture,
            lastMessage: {
                ...lastMessage
            }
        }
    });
}
export const findOtherId = (participants:string[]):string => {
    const myId:string = Meteor.userId();
    let otherUserId:string;
    if (myId === participants[0]) {
        otherUserId = participants[1];
    } else {
        otherUserId =  participants[0];
    }
    return otherUserId;
}
export const findOtherUser = (_id:string):Meteor.User => {
    return Meteor.users.findOne(_id);
};
const findLastMessage = (chatId:string):Message => {
    const Msg: Message[] = MessagesCollection.find({chatId},{
        sort:{createdAt: -1}
    }).fetch();
    if(!Msg[0]) {
        return ChatsCollection.findOne(chatId).lastMessage;
    }
    return Msg[0];
}
// manage messages
export const createDummyMessages = (messages:Message[]):void => {
    messages.forEach(message=>{
        MessagesCollection.insert(message);
    })
}


export const uploadFile = (file:any, isMessage:boolean):void => {
    const fileUpload = ImagesCollection.insert({
        file,
        streams: 'dynamic', 
        chunkSize: 'dynamic',
        allowWebWorkers: true
    }, false); // false for autostart
    fileUpload.on('start', ()=> {
        console.log('start');
    })
    fileUpload.on('end', (err,fileObj)=> {
        console.log('end', fileObj);
        if(err) {
            console.log('error uplod', err);
        }else{
            const _id = fileObj._id;
            if (isMessage) {
                Meteor.call('images.url', _id, (err, url) => {
                    if (err) {
                        console.log('err ', err);
                        
                    } else {
                        console.log("url ", url);
                        Session.set('wwc__imageUrl', url);
                    }
                })
            } else {
                Meteor.call('user.picture', _id, (err, url) => {
                    if (err) {
                        console.log('err ', err);
                        
                    } else {
                        console.log("url ", url);
                    }
                })
            }
        }
        
    })
    fileUpload.on('err', (err, fileObj)=> {
        console.log('err', err);
        
    })
    fileUpload.on('progress', (progress, fileObj)=> {
        console.log('progress', progress);
        
    })
    fileUpload.start(); // to start loading
}

export const getBadges = (chatId:string):number => {
    const participants:string[] = ChatsCollection.findOne(chatId).participants;
    const otherId:string = findOtherId(participants);
    const badge:number = MessagesCollection.find({chatId, senderId: otherId, read: false}).count();
    return badge;
}

export const updateBadges = (participants:string[] , chatId:string):void => {
    const otherId:string = findOtherId(participants);
    Meteor.call('message.update.badges', chatId, otherId, (err, res) => {
        if (err) {
            console.log('err', err);
            
        } else {
            console.log('res', res);
            
        }
    })
}