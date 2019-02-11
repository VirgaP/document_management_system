import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import UserProvider from './UserProvider';
import UserContext from './UserContext';

export class HomePage extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          email:'virga@email.com',
          user:{},
          currentUser: this.props.currentUser
         
        };
        console.log("Current", this.props.currentUser)
        
      }

      componentDidMount = () => {
         axios.get(`http://localhost:8099/api/users/${this.state.currentUser}`)
        //  axios.get(`http://localhost:8099/api/users/${this.state.email}`)
          .then(result => {
          const user = result.data
          this.setState({user});
          console.log("USERIS", user)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      
  render() {

    return (
        <UserProvider>
        <UserContext.Consumer>
           {(context)=> (  
            <React.Fragment>  
                 <div style={username}>You are now logged in as : {context}</div>
        <div className="container-fluid admin_page">
        <div className="row">
        {String(this.state.user.admin) === 'true' ?
        <Button size="large" type="primary" >
            <Link to={'/adminpage'}>Administratoriaus paskyra</Link>
        </Button>
        : <span></span>
        }
       <Button size="large" type="primary" >
            <Link to={'/'}>Vartotojo paskyra</Link>
        </Button>
      </div>
      </div>
        </React.Fragment> 
                  )}
        </UserContext.Consumer>
        </UserProvider>
    )
  }
}
const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}

export default HomePage
