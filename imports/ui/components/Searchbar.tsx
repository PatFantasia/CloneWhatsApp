import React from 'react';
import StyledSearchbar from '../elements/StyledSearchbar';
import FontAwesome from 'react-fontawesome';

const Searchbar = (props:any):JSX.Element => {
    return (
        <StyledSearchbar>
            <label className="searchbar--label">
                <FontAwesome
                    name="search"
                    className="searchbar--icon"
                />
                <input 
                    className="searchbar--input"
                    placeholder="Rechercher ou démarer une discussion"
                />
            </label>
            
        </StyledSearchbar>
    )
}

export default Searchbar;