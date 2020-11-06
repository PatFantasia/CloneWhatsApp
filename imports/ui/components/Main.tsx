import React from 'react';
// import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import {withTracker} from 'meteor/react-meteor-data';
import moment from 'moment';

import StyledMain from '../elements/StyledMain';
import Right from './Right';
import Left from './Left';
import BigOverlay from './BigOverlay';
import ImageViewer from './ImageViewer';
import {findChats} from '../../api/helpers';
import {Chat, MessageType} from '../../api/models';
import OtherProfile from './OtherProfile';
import { ChatsCollection } from '../../api/chats';
import Popup from './Popup';
import { Session } from 'meteor/session';

const initialBigOverlay:any = {
  image: {
    visible: false,
    url:""
  },
  popup: {
    visible: false,
    title:''
  }
}
const Main = (props:any):JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  // Tracker.autorun(()=>{
  //   const chatsReady:boolean = Meteor.subscribe('chats.mine').ready();
  //   const messagesReady:boolean = Meteor.subscribe('messages.all').ready();
  //   if(chatsReady && messagesReady){
  //     setLoading(false);
  //   }
    
  // });  
  
  // console.log("findChats :", findChats());
    const [messageVisible, setMessageVisible] = React.useState<boolean>(false);
    const [selectedChat, setSelectedChat] = React.useState<Chat>({});
    const [OP, setOP] = React.useState<any>({});
    const [BOVisible, setBOVisible] = React.useState<any>(initialBigOverlay);
    
    const handleChatClick = (_id:string):void => {
      // console.log('selected chat before :', selectedChat);
      if(!messageVisible){
        setMessageVisible(true);
      }
      const newChat = _.find((props.chats), {_id} );
      // console.log("selected chat after : ", newChat);
      setSelectedChat(newChat);
      if(newChat) {
        setSelectedChat(newChat);
      }else{
        const newChat:Chat = ChatsCollection.findOne(_id);
        setSelectedChat(newChat);
      }
      
    };
    const handleAvatarClick = (otherId:string):void => {
      setOP({
        visible: true,
        otherId
      })
    }
    const handleClose = ():void => {
      setOP({
        visible: false,
        otherId: ""
      })
    }
    const handleUIClick =(otherUserId:string, username:string, picture:string):void => {
      const chat:Chat = ChatsCollection.findOne({
        participants: {
          $all: [otherUserId, Meteor.userId()]
        }
      });
      console.log("chat :", chat);
      if(chat) {
        handleChatClick(chat._id);
      } else {
        const chatId:string = handleChatClick(ChatsCollection.insert({
          title: username,
          picture,
          participants:[otherUserId, Meteor.userId()],
          lastMessage: {
            content:"",
            createdAt:  moment().toDate(),
            type: MessageType.TEXT
          }
        }));
        handleChatClick(chatId);
        
      }
      
    }
    const showImage =(imageUrl:string):void => {
      setBOVisible(prevState => {
        return {
          ...prevState,
          image: {
            visible: true,
            url: imageUrl
          }
        }
      } )
    };
    
    const handleCloseBO =():void => {
      setBOVisible(prevState => {
          return {
            
            image: {
              visible: false,
              url: ""
            },
            popup: {
              visible: false,
              title: ""
            }
          }
        } 
      );
    }

    const handleMsgClick = (msgId:string, type:string):void => {
      Session.set('wwc--message__id', msgId);
      setBOVisible(prevState => {
        return {
          ...prevState,
          popup: {
            visible: true,
            title: type==="text" ? "Supprimer le Message?" : "Supprimer l'Image?"
          }
        }
      });
    }
    const handleDeleteMsg = ():void => {
      const msgId = Session.get('wwc--message__id');
      Meteor.call('message.delete', msgId, (err, res) => {
        if (err) {
          console.log('err', err);

        } else {
          console.log('res', res);
          handleCloseBO();
        }
      })
    }
  return (
        <StyledMain>
          {!props.loading ? (
              <React.Fragment>
                <Left 
                  chats={props.chats} 
                  onChatClick={handleChatClick} 
                  selectedChat={selectedChat}
                  OPVisible={OP.Visible}
                  onUserItemClick={handleUIClick}
                />  
                 
                <Right 
                  right 
                  messageVisible={messageVisible} 
                  selectedChat={selectedChat}
                  onAvatarClick={handleAvatarClick}
                  OPVisible={OP.visible}
                  onMsgTextClick={handleMsgClick}
                />
                {BOVisible.popup.visible ?(
                  <BigOverlay>
                    <Popup 
                      onCancel={handleCloseBO}
                      onDelete={handleDeleteMsg}
                      title={BOVisible.popup.title} 
                    />
                  </BigOverlay>
                ): null

                }
                {BOVisible.image.visible?(                  
                    <BigOverlay>
                      <ImageViewer 
                        onClose={handleCloseBO}
                        imageUrl={BOVisible.image.url} />
                    </BigOverlay>
                  ): null
                  
                }
                {OP.visible ? (
                  <OtherProfile 
                    onShowImage={showImage} 
                    onClose={handleClose} 
                    otherUserId={OP.otherId} 
                  />
                ): null

                }
              </React.Fragment>
            ): null // find a way to replace by a spiner
          }
        </StyledMain>
  )
}

export default withTracker(()=> {
  const chatsReady:boolean = Meteor.subscribe('chats.mine').ready();
  const messagesReady:boolean = Meteor.subscribe('messages.all').ready();
  return {
    loading: chatsReady && messagesReady ? false : true,
    chats : findChats()

  }
} )(Main);