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
          email:this.props.currentUser.email,
          user:{},
          currentUser: ' '
        //   email: ''
        //   currentUser: this.props.currentUser
        }; 
        const user = props.currentUser;
          console.log("props", user) 
        //   console.log(Object.entries(props.currentUser))
    }
          
      componentDidMount = () => {
        // const {email} = this.props.currentUser
        // this.setState({
        //  username: email
        // })
        
     
         axios.get(`http://localhost:8099/api/users/${this.state.email}`)
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
    // const {
    //     currentUser: { 
    //       email 
    //     }
    //   } = this.props;

    //   console.log("Email", email)
    return (
        <UserContext.Provider 
        // value={this.props.currentUser.email}
        >
            <React.Fragment>  
        <div className="container-fluid profile_page">
        <div className="row ">
        {String(this.state.user.admin) === 'true' ?
        <div className="card">
            <div className="card-body">Content</div> 
            <div className="card-footer"> 
            <Button size="large" type="primary" >
                <Link to={'/adminpage'}>Administratoriaus paskyra</Link>
            </Button>
            </div>
        </div>
            : <span></span>
            }
        <div className="card">
            <div className="card-body">Content</div> 
            <div className="card-footer"> 
            <Button size="large" type="primary" >
                {/* <Link to={'/vartotojo-paskyra'}>Vartotojo paskyra</Link> */}
                <Link to={`/vartotojas/${this.props.currentUser.email}`}> Vartotojo paskyra </Link>           
             </Button>
        </div>
        </div>
      </div>
      </div>
        </React.Fragment> 
               
        </UserContext.Provider>
        // </UserProvider>
    )
  }
}
const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}

export default HomePage
