import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';

export class SingleGroup extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           groupName: this.props.match.params.name, //is index.js 
           group: {},
           groupUsers:[]
        }
        console.log("id", this.state.groupName);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/group/${this.state.groupName}`)
          .then(result => {
            const group = result.data
          this.setState({group});
          const groupUsers = result.data.groupUsers
          this.setState({groupUsers})
          console.log("Grupe", groupUsers)
        //   console.log('Useriai', groupUsers)
          })
          .catch(function (error) {
            console.log(error);
          });
        
        
      }
  
      DeleteItem = (event) => {
          axios.delete(`http://localhost:8099/api/group/${this.state.groupName}`)
          .then(result => {
            const group = result.data
          this.setState({group});
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.props.history.push('/') //redirects Home after delete
      }
      
  
    render() {
     console.log("params url: ", this.props.match.params.groupName)
     console.log('GRUPE', this.state.group)
      return (
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    <h5>Pavadinimas: {this.state.group.name}</h5>
                   
                    <div>
                      <h5>Grupės vartotojai: </h5> 
                    {(!this.state.groupUsers.length) ? <span>Grupei vartotojai neprisikirti</span> : <ul>{this.state.groupUsers.map((user) => (<li key={user.email}>{user.name} {user.surname}</li>))}</ul>}
                    </div>
              </div>
              <div className="card-footer">
              <p>galim prideti dokumentu tipus priskirtu grupei</p>
              </div>
            </div>
          </div> 
      );
}
}
export default SingleGroup;
const style = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'20px',
    width: '70%'
  }
  const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}