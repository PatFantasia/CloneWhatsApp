import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from "meteor/tracker";
import moment from 'moment';
import {withTracker} from 'meteor/react-meteor-data';

import {Chat, Message, MessageType} from '../../api/models';
import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import MessageBox from './MessageBox';
import Modal from './Modal';
import {MessagesCollection} from '../../api/messages';
import StyledMessageView from '../elements/StyledMessageView';
import { uploadFile } from '../../api/helpers';
import { findOtherId } from '../../api/helpers';


let fileInput:any;
const MessageView = (props:any):JSX.Element => {
    const icons:any[] = [
        {
            name:"search",
            func: ()=>{}
        }, 
        {
            name:"paperclip",
            func: ()=>{handlePaperClick()}
        }, 
        {
            name:"ellipsis-v",
            func: ()=>{}
        }
    ];
    const selectedChat:Chat = props.selectedChat;
    
    // let messages:Message[];
    // console.log('icons : ', icons);
    // console.log('title : ', selectedChat.title);

    // ******Tracker can't dealing with prop passing to other component,*******
    //*********use withTracker to do it******
    // Tracker.autorun(()=>{
    //      messages = MessagesCollection.find({chatId:selectedChat._id}).fetch();
    //      console.log('autorun called ', messages);
         
    // });

    const [fabVisible, setFabVisible] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [selectedImage, setSelectedImage] = React.useState<any>("");
    const handlePaperClick = ():void => {
        setFabVisible(!fabVisible);
    };
    const handleInputClick =():void => {
        const myInput:HTMLElement = document.getElementById('fileUpload');
        console.log('click ok', myInput);
        myInput.click();    
    }
    const handleInputChange =(e:React.ChangeEvent<HTMLInputElement>):void => {
        fileInput= e.target.files[0];
        console.log('fileInput', fileInput);
        
        if(fileInput){
            setModalVisible(true);
            const fileReader:FileReader = new FileReader();
            fileReader.onload = function(e) {
                setSelectedImage(e.target.result);        
            }
            fileReader.readAsDataURL(fileInput);
        }
    }
    const handleClose =():void => {
        setModalVisible(false);
        setFabVisible(false);
    }
    const handleSend = (content:string, type:MessageType):void => {
        const message:Message = {
            chatId : selectedChat._id,
            content,
            createdAt: moment().toDate(),
            senderId: Meteor.userId(),
            type ,
            read: false
        }
        if(modalVisible) {
            handleClose();
        }
        // Notice : Inside a collection, callback methods returns '_id' in case of 
        // success. So, params 'res' : _id 
        Meteor.call('message.insert', message, (err, _id) =>{
            if (err) {
                console.log("err insert : ", err);
                
            } else {
                console.log("result : ", _id);
                uploadFile(fileInput, true);
                Tracker.autorun(()=> {
                    const imageUrl:string = Session.get('wwc__imageUrl');
                    if(imageUrl && message.type === 'image') {
                        Meteor.call('message.update', _id, imageUrl,(err, res) =>{
                            if (err) {
                                console.log('err', err);
                                
                            } else {
                                console.log('res', res);
                                
                            }
                        })  
                    }
                })
            }
        } )
    }
    const avatarClick =():void => {
        const otherId = findOtherId(selectedChat.participants);
        props.onAvatarClick(otherId);
    }
    return (
        <StyledMessageView>
            <Header 
                iconClass="greyIcon" 
                icons={icons}
                OPVisible={props.OPVisible}
            >
                <Avatar 
                    avatar_url={selectedChat.picture} 
                    onAvatarClick={avatarClick}
                />
                <div className="headerMsg--container">
                    <span className="headerMsg--title">{selectedChat.title}</span>
                    <span className="headerMsg--sbTitle"> en ligne</span>    
                </div> 
                
            </Header>
            {modalVisible?(
                <Modal 
                    selectedImage={selectedImage}
                    onClose={handleClose}
                    onUpload={handleSend} 
                />
            ):(
                <React.Fragment>
                    {/* props is sending by withTracker */}
                   <MessageBox 
                       onMsgTextClick={props.onMsgTextClick}
                       fabVisible={fabVisible}
                       selectedChat={selectedChat}
                       messages={props.messages}
                       onFABItemClick={handleInputClick}
                       onInputChange={handleInputChange}
                   /> 
                   <Footer onSend={handleSend} />
                </React.Fragment>
            )

            }
        </StyledMessageView>
    )
}

export default withTracker(({selectedChat})=> {
    return {
        messages: MessagesCollection.find({chatId: selectedChat._id}).fetch()
    } 
    
})(MessageView);