import React from 'react';
import StyledAvatar from '../elements/StyledAvatar';

const Avartar = (props:any):JSX.Element => {
    return (
        <StyledAvatar>
            <img 
                src={props.avatar_url} 
                alt="avatar"
                className="avatar--img"
            />
        </StyledAvatar>
    )
}

export default Avartar;