import React from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import _ from 'lodash';

import {User} from '../../api/models';
import StyledUsersList from "../elements/StyledUsersList";
import UserItem from "./UserItem";

const UsersList = (props:any):JSX.Element => {
    const users:User[] = props.users;
    const groupedUsers:string[] = _.groupBy(users, (user:User) => {
        return user.username.toUpperCase()[0];
    } );
    const newUsers:any[] = Object.keys(groupedUsers)
                            .map(letter => {
                                return {
                                    letter,
                                    groupedUsers: groupedUsers[letter]
                                }
                            } );
    
    const renderUserItem = (userList:User[]):JSX.Element[] => {
        return userList.map(user => {
            return(
                <UserItem 
                    key={user._id}
                    id={user._id}
                    picture={user.profile.picture}
                    username={user.username}
                    actu={user.profile.actu}
                    onUserItemClick={props.onUserItemClick}
                />
            )
        })
    }
    const renderLetters = ():JSX.Element[] => {
        return newUsers.map((newUser, i:number) => {
            return (
                <React.Fragment key={i} >
                    <div className="letter">
                        {newUser.letter}
                    </div>
                    {renderUserItem(newUser.groupedUsers)}
                </React.Fragment>
            )
        } )
    }
    return (
        <StyledUsersList>
            {renderLetters()}
        </StyledUsersList>
    )
}

export default withTracker((props:any)=> {
    console.log('users2', props.users2);

    return {
        users: props.pattern === "" ? Meteor.users.find({_id: {
            $ne: Meteor.userId()
        }}, {
            sort: {
                username: 1
            }
        }).fetch() : props.user2
    }
} )(UsersList);