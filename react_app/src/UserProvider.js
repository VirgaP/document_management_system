import React, { Component } from 'react';
import UserContext from './UserContext';
import axios from 'axios';


export default class UserProvider extends Component {
    state = {
        username: '' || this.props.currentUser
    }
   

  componentDidMount = () => {
    axios.get('http://localhost:8099/api/users/') //retrieve last registered user username from DB
    .then(result => {
    var idx = result.data.length - 1 - result.data.slice().reverse().findIndex( (o) => o.username);//finds index of last username from data array 
    console.log("index:", idx )
    const username = result.data[idx].username
    this.setState({username});
    })
    .catch(function (error) {
      console.log(error);
    });
}
  render() {
    console.log("USerprovider", this.props.currentUser)
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
