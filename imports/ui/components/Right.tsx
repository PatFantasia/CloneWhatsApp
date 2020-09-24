import React from 'react';
import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';

const Right = (props:any):JSX.Element => {
    const messageText:string = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation données. Connectez votre téléphone à un réseau wifi";
    return (
        <StyledRight>
            <RightImg right={props.right} messageText={messageText} />
        </StyledRight>
    )
}

export default Right;