import React, { Component } from 'react';
import { Button, notification, Icon } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddGroup from './AddGroup';
import UserDocumentListContainer from './UserDocumentListContainer'
import {jszip} from 'jszip';
import {Link} from 'react-router-dom';
import ReceivedUserDocuments from './ReceivedUserDocuments'
import SingleUserComponent from './user/SingleUserComponent';


export class SingleUser extends Component {

    constructor(props) {
        super(props)
          
        this.state = {
           id: this.props.match.params.email, 
           user: {},
           currentUser:this.props.currentUser.admin,
           groups:[],
           userGroups:[],
           groupsArray:[],
           email:''
        }
        console.log('PROPS', props)
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
        var name = value;
        var newGroup = {name};
        var newArray = this.state.userGroups.slice();       
        newArray.push(newGroup);   
        console.log("NEW ARRAY", newArray)
        this.setState({userGroups:[...newArray]})
      }
  
      DeleteUser = (event) => {
          axios.delete(`http://localhost:8099/api/users/${this.state.id}`)
          .then(response => {
            console.log("Response", response);
            const responseStatus = response.status
           console.log(responseStatus)
           if(responseStatus >= 200 && responseStatus < 300){ 
            notification.success({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: 'Vartotojas ištrintas sėkmingai!'
          });    
          this.props.history.push('/vartotojai')           }
        })
        .catch(error => {
          if(error.status === 500) {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida įkeliant dokumentą, perkraukite puslapį ir bandykite dar kartą!'
              });                    
          } else {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: error.message || 'Atsiprašome įvyko klaida, bandykite dar kartą!'
              });                                            
          }
        });
        }

      handleRemove(index) {
        let userGroups = this.state.userGroups
         let groupIdx = this.state.userGroups.findIndex((group) => group.name === index); //find array elem index by name/index
        console.log("Index", groupIdx)
          const newList = this.state.userGroups.splice(groupIdx, 1); //delets element and returns removed element
         this.setState({ userGroups: [...userGroups] }); 

         axios.delete(`http://localhost:8099/api/users/${this.state.id}/${index}/remove`)
             .then(res => {
               console.log(res)
           })
           .catch(function (error) {
               console.log(error);
           }); 
       }
  
       handleZip = () => {
        axios(`http://localhost:8099/api/files/archive/${this.state.id}`, {
          method: 'GET',
          responseType: 'arraybuffer' //Force to receive data in a Blob Format
      })
      .then(response => {
        console.log("Response zip", response.data);
        const data = response.data;
        const fileName = "my.zip";
      
        this.saveFile(data, fileName);

        // const file = new Blob(
        //   [response.data], 
        //   {type: 'application/zip'},
        // );
        //   const fileURL = URL.createObjectURL(file);
        //     let a = document.createElement('a');
        //     a.href = fileURL;
        //     a.click();
        })
            .catch(error => {
                console.log(error);
            });
          
        }
        saveFile(blob, filename) {
          if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
          } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            setTimeout(() => {
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            }, 0)
          }
        }
    render() {
      return (
        
        <div className="container single-user">
              <SingleUserComponent user={this.state.user}/>
                {/* <button className="btn btn-primary" onClick={this.handleZip.bind(this)}>Atisiusti archyva</button> */}
                
              <div className="container user-groups"> 
              <div className="row"> 
                {String(this.state.currentUser) === 'true'?
                
                <div className="col-lg-6 col-md-6">
                      <h5>Vartotojo grupės: </h5>                    
                    {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}
                  &nbsp;<Icon type="close-circle" onClick={this.handleRemove.bind(this, group.name)}/>
                        </li>))}</ul>}
                </div> : 
                <div className="container user-groups">
                      <h5>Jūsų grupės: </h5> 
                      {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}</li>))}</ul>}
                </div>
                     }
                    {String(this.state.currentUser) === 'true'?
                      <AddGroup 
                      userGroups={this.state.userGroups}
                      onResultChange={this.handleResultChange}
                      id={this.state.id}/> 
                      : <span></span>
                        }
                  </div> 
                </div>        
                    
              {/* <h4>Gauti dokumentai</h4>
                      <ReceivedUserDocuments email={this.state.id}/> */}
              <div className="card-footer">
              
                    {String(this.state.currentUser) === 'true'?
                 <Button type="danger" onClick={this.DeleteUser.bind(this)}> Trinti vartototoją </Button>
                      : <span></span> }   
                 </div>
          </div>
              
      );
    }
}

export default SingleUser
