import { Meteor } from 'meteor/meteor';
import React from 'react';
import FontAwesome from 'react-fontawesome';


import StyledLSForm from '../elements/StyledLSForm';

const LSForm = (props:any):JSX.Element => {
    const {type} = props;
    const title:string = type ==="actu" ? "Actu" : "Votre nom"; 
    const value:string = type==="actu" ? Meteor.user().profile.actu : Meteor.user().username;
    const [editable, setEditable] = React.useState<boolean>(false);
    const [state, setState] = React.useState<string>(value);
    const toggleEditable = ():void => {
        if (!editable) {
            setEditable(true);
        } else {
            if (type === "actu") {
                Meteor.users.update({_id: Meteor.userId()},{
                    $set : {
                        "profile.actu" : state
                    }
                });
            } else {
                Meteor.call('user.username', Meteor.userId(), state)
            }
            setEditable(false)
        }
    };
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const newValue:string = e.target.value;
        console.log("newValue", newValue);
        
        setState(newValue);
        // if (type === "actu") {
        //     Meteor.users.update({_id: Meteor.userId()},{
        //         $set : {
        //             "profile.actu" : newValue
        //         }
        //     })
        // } else {
        //     Meteor.call('user.username', Meteor.userId(), newValue)
        // }
    }
    // console.log('state in LS', state);
    // console.log('value in LS', value);
    
    return (
        <StyledLSForm>
            <span className="LSForm--title">
                {title}
            </span>
            {!editable ? (
                    <div className="LSForm--container">
                        <input 
                            readOnly={true} 
                            className="LSForm--input __border"
                            onClick={toggleEditable}
                            value={state}
                        />
                        <FontAwesome
                            className="LSForm--icon"
                            name="pen"
                            
                        />
                    </div>
                ) : (
                    <div className="LSForm--container">
                        <input 
                            readOnly={false} 
                            className="LSForm--input __border"
                            value={state}
                            onChange={handleChange}
                            />
                        <FontAwesome
                            className="LSForm--icon"
                            name="check"
                            onClick={toggleEditable}
                        />
                    </div>

                )
            }
            
        </StyledLSForm>
    )
}

export default LSForm;