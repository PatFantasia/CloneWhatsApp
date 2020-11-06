import { Meteor } from 'meteor/meteor';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import FlipMove from 'react-flip-move';

import Day from "./Day";
import FABs from "./FABs";
import StyledMessageBox from '../elements/StyledMessageBox';
import MessageText from './MessageText';
import FABItem from './FABItem';
import MessageImage from './MessageImage';
import { updateBadges } from '../../api/helpers';

const MessageBox = (props:any):JSX.Element => {
    const {messages, selectedChat, fabVisible, onFABItemClick, onInputChange  } = props;
    let isEven:boolean = false;
    const format:string = "D MMMM Y";
    let messagesEnd = HTMLDivElement;
    // const messagesEnd = React.createRef();

    // console.log('messages : ', messages);
   
    // This is an array 
    messages.forEach(message => {
        if (!message.senderId) {
            message.ownership= !!message.senderId === isEven ? 'mine' : 'other';
            isEven = !isEven;
            return message;
        } else {
            message.ownership = message.senderId === Meteor.userId() ? 'mine' : 'other';
            return message;
        }
    });
    // console.log("messages with ownerId", messages);
    // This is an object (dictionary)
    const groupedMessages:any = _.groupBy(messages, message =>{
        return moment(message.createdAt).format(format);
    })
    // console.log("grouped Messages : ", groupedMessages);
    const newMessages:any[] = Object.keys(groupedMessages)
                                .map(key =>{
                                    return {
                                        date:key,
                                        groupedMessages: groupedMessages[key],
                                        today: moment().format(format) === key
                                    }

                                })
    const scrollToBottom = ():void => {
        messagesEnd.scrollIntoView({behavior: "smooth"});
        // messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
        console.log('scroll to the bottom function called');
        
    }
    React.useEffect(()=>{
        scrollToBottom();
        updateBadges(selectedChat.participants, selectedChat._id);
    }, [selectedChat, messages])
    // console.log('newMessages ', newMessages);
    const renderMessages =(newMessage:any):JSX.Element[] => {
        // console.log('messages : ', newMessage.groupedMessages);
        
        return newMessage.groupedMessages.map(message =>{
            const msgClass = `message message--${message.ownership}`;
            if(message.type === 'image') {
                const mine:boolean = message.ownership ==='mine';
                return (
                    <MessageImage
                        key={message._id}
                        content={message.content}
                        createdAt={message.createdAt}
                        mine={mine}
                        onImgClick={()=> props.onMsgTextClick(message._id,"image")}
                    />
                )
            }
            return (
                <MessageText 
                    key={message._id}
                    msgClass={msgClass}
                    content={message.content}
                    ownership={message.ownership}
                    createdAt={message.createdAt}
                    id={message._id}
                    onClick={props.onMsgTextClick}

                />
            )
        })
    }
    const renderDays = ():JSX.Element[] => {
        return newMessages.map((newMessage, index:number)=>{
            const dateText:string = newMessage.today? "Aujourd'hui" : newMessage.date;
            // console.log("dateText: ", dateText);
                return (
                    <div key={index}>
                        <Day date = {dateText} /> 
                        {renderMessages(newMessage)}     
                    </div>
                );            
        })
        
    }
    return (
        <StyledMessageBox>
            <FABs
                fabVisible={fabVisible} 
                onFABItemClick={onFABItemClick}            
                onInputChange={onInputChange}
            />
            <FlipMove>
        {       renderDays()}
            </FlipMove>
        <div 
            ref={(el:HTMLDivElement)=> messagesEnd = el}
        /> 
        {/* <div ref={messagesEnd} /> */}

        </StyledMessageBox>
    )
}

    export default MessageBox;