import React from 'react';

import {Chat} from '../../api/models';
import StyledChatList from '../elements/StyledChatList';
import ChatItem from './ChatItem';

const  ChatList = (props:any):JSX.Element => {
    const {chats, onChatClick, selectedChat} = props;
    const renderChats = ():JSX.Element[] =>{
        return chats.sort((a:Chat, b:Chat) => {
            return b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime();
        })
            .map((chat: Chat) =>{
                const active:boolean = selectedChat._id === chat._id; 
                return(
                    <React.Fragment key={chat._id}>
                        <ChatItem
                            key={chat._id}
                            {...chat}
                            onChatClick={onChatClick}
                            active={active}
                        />
                    </React.Fragment>
                )
                // console.log("chat in chats list :", chat);
                // console.log("title in chats list :", chat.title);
            })
    }
    // console.log("renderChats :", renderChats());
return (
        <StyledChatList>
            {renderChats()}  
                   {/* wainting chat list */}
        </StyledChatList>
    )
}
export default  ChatList;
