import React from 'react';
import FontAwesome from 'react-fontawesome';
import { MessageType } from '../../api/models';

import StyledModal from '../elements/StyledModal';

const Modal = (props:any):JSX.Element => {
    const {selectedImage, onClose, onUpload} = props;
    return (
        <StyledModal>
            <div className="modal--header">
                <FontAwesome
                    className="modal--header__icon"
                    size="2x"
                    name="times"
                    onClick={onClose}
                />
                <span className="modal--header__title">Aperçu</span>
            </div>
            <div className="modal--body">
                <img 
                    style={{width: "349px", height: "349px"}}
                    alt="img" 
                    src={selectedImage} 
                />
                <div onClick={()=>{onUpload('', MessageType.IMAGE)}} className="modal--body__fab">
                    <FontAwesome
                        name="paper-plane"
                        size="3x"
                    />
                </div>
            </div>
            <div className="modal--footer">
                <div className="modal--footer__box">
                    <img 
                        style={{width: "100%", height: "100%"}}
                        alt="img" 
                        src={selectedImage} 
                    />
                    <FontAwesome
                        name="plus"
                        size="2x"
                    />
                    <span>Ajouter</span>
                </div>
            </div>
        </StyledModal>
    )
}

export default Modal;