import React from 'react';

import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';
import MessageView from './MessageView';

const Right = (props:any):JSX.Element => {
    const messageText:string = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation données. Connectez votre téléphone à un réseau wifi";
    const {right, messageVisible, selectedChat, onAvatarClick, OPVisible, onMsgTextClick} = props;
    // console.log("OPVisible ", OPVisible);
    
    return (
        <StyledRight OPVisible={OPVisible} >
            {messageVisible? (
                <MessageView 
                    onMsgTextClick={onMsgTextClick}
                    selectedChat={selectedChat}
                    onAvatarClick={onAvatarClick}
                    OPVisible={OPVisible} 
                />
            ): (
                <RightImg right={right} messageText={messageText} />
                // <MessageView selectedChat={selectedChat} />
            )

            }
        </StyledRight>
    )
}

export default Right;