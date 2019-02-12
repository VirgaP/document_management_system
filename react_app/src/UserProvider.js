import React, { Component } from 'react';
import UserContext from './UserContext';
import axios from 'axios';


export default class UserProvider extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
        username: '',
    }
    console.log("Props in userprovider", this.props)
  }
  
  render()  {
    return (
      <div>
          {/* defines context state=username and passes to children */}
        <UserContext.Provider value={this.state.username}> 
            {this.props.children}
        </UserContext.Provider>
      </div>
    )
  }
}
