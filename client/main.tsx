import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

import App from '../imports/ui/components/App'
import { Tracker } from 'meteor/tracker';

Meteor.startup(() => {
  
  Tracker.autorun(()=>{
    const userReady:boolean = Meteor.subscribe('users.all').ready();
    if (userReady) {
      ReactDOM.render(<App/>, document.getElementById('root'));
    } else {
      // console.log("user not ready !");
            
    }
  })

});
