import React from 'react';

import StyledRightImg from '../elements/StyledRightImg';

const RightImg = (props:any):JSX.Element => {
    return (
        <StyledRightImg right={props.right}>
            <img
                alt="bg"
                // instead of rigthImg--image
                className="rightImg--image"
                // instead of ../../../public/images/whatsapp-bg-1.jpg
                src="./images/whatsapp-bg-1.jpg"
            />
            <h3 className="rightIng--title">
                Gardez votre téléphone connecté
            </h3>
            <div className="rightImg--div">
                <p className="rightImg--p">
                    {props.messageText}
                </p>
                <div className="rightImg--divider"/>
            </div>
            {props.children}
        </StyledRightImg>
    )
}

export default RightImg;