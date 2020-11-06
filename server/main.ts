import { Meteor } from 'meteor/meteor';

import { createDummyUsers, createDummyChats, createDummyMessages } from '../imports/api/helpers'; 
import {dummyUsers} from '../imports/api/users';
import {ChatsCollection, dummyChats} from '../imports/api/chats';
import {MessagesCollection, dummyMessages} from '../imports/api/messages';

Meteor.startup(() => {
    console.log("server started !");
    
    const numberOfUsers:number = Meteor.users.find().count();
    const numberOfChats:number = ChatsCollection.find().count();
    const numberOfMessages:number = MessagesCollection.find().count();

    if (numberOfUsers === 0)  {
        console.log(" Il n'y a pas d'utilisateur !");
        createDummyUsers(dummyUsers);
    } else {
        console.log(" Il y a des utilisateurs !");
    }
   

    if (numberOfChats === 0)  {
        console.log(" Il n'y a pas de chats !");
        createDummyChats(dummyChats);
    } else {
        console.log(" Il y a des chats !");
        // Meteor.call('chats.remove', (err, res)=>{
        //     if (err) {
        //         console.log("error remove chats :", err);
        //     } else {
        //         console.log('resultat remove chats : ', res);
                
        //     }
        // });
    }
   
    if (numberOfMessages === 0)  {
        console.log(" Il n'y a pas de messages !");
        createDummyMessages(dummyMessages);
    } else {
        console.log(" Il y a des messages !");

        //  Meteor.call('message.remove', (err, res)=>{
        //     if (err) {
        //         console.log("error remove messages :", err);
        //     } else {
        //         console.log('resultat remove messages : ', res);
                
        //     }
        // });
   
    }
})