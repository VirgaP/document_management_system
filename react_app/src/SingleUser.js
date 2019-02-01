import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';

export class SingleUser extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           id: this.props.match.params.email, //is index.js 
           user: {},
           userGroups:[]
        }
        console.log("id", this.state.id);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/users/${this.state.id}`)
          .then(result => {
            const user = result.data
          this.setState({user});
          const userGroups = result.data.userGroups
          this.setState({userGroups})
          console.log("USERIS", user)
          console.log('Grupes', userGroups)
          })
          .catch(function (error) {
            console.log(error);
          });
        
        
      }
  
      DeleteItem = (event) => {
          axios.delete(`http://localhost:8099/api/users/${this.state.id}`)
          .then(result => {
            const user = result.data
          this.setState({user});
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.props.history.push('/') //redirects Home after delete
      }
      
  
    render() {
     console.log("params url: ", this.props.match.params.email)
      return (
          <UserProvider>
          <UserContext.Consumer>
             {(context)=> (  
              <React.Fragment>  
          <div style={username}>You are now logged in as : {context}</div>
  
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    <h5>Vardas: {this.state.user.name}</h5>
                    <h5>Pavardė: {this.state.user.surname}</h5>
                    <h5>El.paštas: {this.state.user.email}</h5>
                    <h5>Vartotojo rolė: {String(this.state.user.admin) === 'true' ? 'administratorius' : 'vartototojas'}</h5> 
                    {/* converts boolean to String */}
                    <div>
                      <h5>Vartotojo grupės: </h5> 
                    {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}</li>))}</ul>}
                    </div>
                    <div>
                      <h5>Vartotojo dokumentai</h5>
                    </div>
              </div>
              <div className="card-footer">
                 <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti </Button>
              </div>
            </div>
          </div>
              </React.Fragment> 
                  )}
              </UserContext.Consumer>
              </UserProvider>
      );
    }
}

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
export default SingleUser
