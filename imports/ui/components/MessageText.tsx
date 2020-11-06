import React from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';

const MessageText = (props:any):JSX.Element => {
    const {onClick, id} = props;
    const handleClick = (e:React.MouseEvent, msgId:string, type:string):void => {
        const message = e.currentTarget;
        console.log('target', message);
        if(message.classList.contains("message--mine")){
            onClick(msgId,type)
        }else{
            return;
        }
        
    }
    return (
        <div className="messageContainer">
            <div 
                onClick={(e) => {handleClick(e, id, "text")}} // type of msg in ''string'' in models.ts
                className={props.msgClass}
            >
            <p> {props.content} </p>
            <div className="detailsContainer">
                <span>
                    <Moment format='HH:mm' >
                        {props.createdAt}
                    </Moment>
                </span>
                {
                    props.ownership === "mine"?
                    <FontAwesome name="check-double"/> : null
                }
            </div>
            </div>
        </div>
    )
}

export default MessageText;