import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import moment from 'moment';
 

import {Chat} from './models';


export const ChatsCollection = new Mongo.Collection<Chat>('Chats');

export const dummyChats: Chat[] = [
    {
        title: "",
        picture: "",
        participants: ["2X8BSSe99YYSJBP6M","uyYeSJiJmdp2iaFkL"],
        lastMessage: {
            content: "Slt! Comment ça va ?",
            createdAt: moment()
                        .toDate()
        }
    },

    {
        title: "",
        picture: "",
        participants: ["tPMvEjKwg9qvmCpDM","2X8BSSe99YYSJBP6M"],
        lastMessage: {
            content: "Je vais bien et toi ?",
            createdAt: moment()
                        .subtract(1,'days')
                        .toDate()
        }
    },

    {
        title: "",
        picture: "",
        participants: ["tPMvEjKwg9qvmCpDM","uyYeSJiJmdp2iaFkL"],
        lastMessage: {
            content: "Hello !! ",
            createdAt: moment()
                        .subtract(2,'days')
                        .toDate()
        }
    }
]


// Meteor.methods({
//     "chats.create": function(otherUserId:string) {
//         return ChatsCollection.insert({
//             title: "",
//             picture: "",
//             participants: [this.userId, otherUserId],
//             lastMessage: {
//                 content: "",
//                 createdAt: moment().toDate(),
//                 type: MessageType.TEXT,
//                 read: false
//             }
//         })
//     }
// })

Meteor.methods({
        "chats.remove": function(){
            return ChatsCollection.remove({});
        }
    })

 

if(Meteor.isServer){
     
    Meteor.publish('chats.all', function(){
        return ChatsCollection.find();
    });
    Meteor.publish('chats.mine', function(){
        return ChatsCollection.find({
            participants : {
                $in: [this.userId]
            }
        });
    });
  
}

