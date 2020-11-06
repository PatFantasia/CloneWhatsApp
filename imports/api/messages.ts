import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import moment from 'moment';

import {Message, MessageType} from './models';


export const MessagesCollection:Mongo.Collection<Message> = new Mongo.Collection('Messages');
if (Meteor.isServer){
    Meteor.publish('messages.all', function() {
        return MessagesCollection.find();
    } )
    
    Meteor.methods({
      "message.insert" : function(message){
        return MessagesCollection.insert(message);
      },
      "message.update" : function (_id:string, content:string)  {
        return MessagesCollection.update({_id}, {
          $set: {
            content
          }
        })
      },
      "message.update.badges" : function (chatId:string, otherId:string) {
        return MessagesCollection.update({
          chatId, senderId: otherId
        },{
            $set: {
              read: true
            }
          }, {
            multi: true
          }
        );
      },
      "message.delete" : function (_id:string) {
        MessagesCollection.remove(_id);
      }
    })

    // for testing. it's more safe to prevent calling out of server : MeteorIserver
    Meteor.methods({
      "message.remove": function(){
          return MessagesCollection.remove({});
      }
    })
}


export const dummyMessages: Message[] = [
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().subtract(2, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().subtract(2, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().subtract(2, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().subtract(2, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().subtract(1, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().subtract(1, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().subtract(1, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().subtract(1, 'days').toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "z3mFwYK7JLazskewp",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
        {
          chatId: "PLJFsvWbCPgoYZFrK",
          content: "Salut ça va ?",
          createdAt: moment().toDate(),
          type: MessageType.TEXT,
        },
      ]

       