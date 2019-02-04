import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddBook from './AddBook';
import UserDocumentListContainer from './UserDocumentListContainer'

export class SingleUser extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           id: this.props.match.params.email, //is index.js 
           user: {},
           groups:[],
           userGroups:[],
           groupsArray:[],
           email:''

        }
        console.log("id", this.state.id);
        this.handleResultChange = this.handleResultChange.bind(this);
      }
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/users/${this.state.id}`)
          .then(result => {
            const user = result.data
          this.setState({user});
          const userGroups = result.data.userGroups
          this.setState({userGroups})
          const email = user.email
          this.setState({email})
          console.log("USERIS", user)
          console.log("EMAIL", email)
          console.log('Grupes', userGroups)
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      handleResultChange(value) {
        console.log("VALUE", value)
        var newArray = this.state.userGroups.slice();       
        newArray.push(value);   
        console.log("NEW ARRAY", newArray)
        this.setState({userGroups:[...newArray]})
        
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
      handleRemove(index) {
       
         const payload = {groupName: index}
         var list = this.state.groups;
        
         let groupIdx = this.state.groups.findIndex((group) => group.group.name === index); //find array elem index by title/index
         const newList = list.splice(groupIdx, 1); //delets element and returns updated list of groups
         this.setState({ groups: newList }); 
 
         axios.delete(`http://localhost:8099/api/users/${this.state.id}/removeGroup`, {data: payload})
             .then(res => {
               console.log(res)
               console.log('it works')
           })
           .catch(function (error) {
               console.log(error);
           }); 
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
                    {/* <div>
                      <h5>Vartotojo grupės: </h5> 
                    {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}</li>))}</ul>}
                    </div> */}
                     {String(this.state.user.admin) === 'true'?
                    <div>
                      <h5>Vartotojo grupės: </h5> 
                     
                    {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}
                        <button className="btn-default" 
                  onClick={this.handleRemove.bind(this, group.name)}
                  >x</button>
                        </li>))}</ul>}
                    </div> : 
                    <div>
                      <h5>Jūsų grupės: </h5> 
                      {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}</li>))}</ul>}
                    </div>
                     }
                    {String(this.state.user.admin) === 'true'?
                      <AddBook 
                      onResultChange={this.handleResultChange}
                      id={this.state.id}/> 
                      : <span></span>
                        }
                    </div>
              </div>
              <div className="card-footer">
              <div>
                      <h5>Vartotojo dokumentai</h5>
                      <UserDocumentListContainer email={this.state.id}/>
                    </div>
                    {String(this.state.user.admin) === 'true'?
                 <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti vartototoją </Button>
                      : <span></span> }   
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
