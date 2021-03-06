import React from 'react';
import FontAwesome from 'react-fontawesome';
import { MessageType } from '../../api/models';

import StyledFooter from '../elements/StyledFooter';

const Footer = (props:any):JSX.Element => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [iconeName, setIconeName] = React.useState<string>("microphone");
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setInputValue(e.target.value);
        const name:string = e.target.value !== "" ? "paper-plane" : "microphone";
        setIconeName(name);
    }

    const handleClick = ():void => {
        if( name === 'microphone') {
            return;
        }
        props.onSend(inputValue, MessageType.TEXT);
    }

    return (
        <StyledFooter>
            <FontAwesome
                className="iconFooter"
                name="smile"
            />
            <label className="message--label">
                <input className="message--input"
                    placeholder="Taper un message"
                    value={inputValue}
                    onChange={handleChange}
                    />
            </label>
            <FontAwesome
                className="iconFooter"
                name={iconeName}
                onClick={handleClick}
            />
        </StyledFooter>
    )
}

export default Footer;