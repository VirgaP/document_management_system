import React, { Component } from 'react';
import { Button, notification } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddGroup from './AddGroup';
import UserDocumentListContainer from './UserDocumentListContainer'
import {jszip} from 'jszip';
import {Link} from 'react-router-dom';


export class SingleUser extends Component {

    constructor(props) {
        super(props)
          
        this.state = {
           id: this.props.match.params.email, //is index.js 
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
       var name = {value};
        var newArray = this.state.userGroups.slice();       
        newArray.push(name);   
        console.log("NEW ARRAY", newArray)
        this.setState({userGroups:[...newArray]})
      }
  
      DeleteItem = (event) => {
      
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
       
         const payload = {groupName: index}
         var list = this.state.groups;
        
         let groupIdx = this.state.groups.findIndex((group) => group.group.name === index); //find array elem index by title/index
         const newList = list.splice(groupIdx, 1); //delets element and returns updated list of groups
         this.setState({ groups: newList }); 
 
         axios.delete(`http://localhost:8099/api/users/${this.state.id}/removeGroup`, {data: payload})
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
     console.log("params url: ", this.props.match.params.email)
      return (
          <UserContext.Consumer>
             {(context)=> (  
              <React.Fragment>  
          <div style={username}>You are now logged in as : {context}</div>
  
           <div className="container user_form" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    {/* <button className="btn btn-primary" onClick={this.handleZip.bind(this)}>Atisiusti archyva</button> */}
                    <h5>Vardas: {this.state.user.name}</h5>
                    <h5>Pavardė: {this.state.user.surname}</h5>
                    <h5>El.paštas: {this.state.user.email}</h5>
                    <h5>Vartotojo rolė: {String(this.state.user.admin) === 'true' ? 'administratorius' : 'vartototojas'}</h5> 
                    {/* converts boolean to String */}
                     {String(this.state.currentUser) === 'false'?
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
                    {String(this.state.currentUser) === 'false'?//false nes spring negrazina teisingai
                      <AddGroup 
                      onResultChange={this.handleResultChange}
                      id={this.state.id}/> 
                      : <span></span>
                        }
                    </div>
              </div>
              <div className="card-footer">
              <div>
                      <div className="row user_document"><h5>Vartotojo dokumentai</h5>&nbsp;&nbsp;<button className="btn"><Link to={'/naujas-dokumentas'}>Kurti naują dokumentą</Link></button></div>
                      <UserDocumentListContainer email={this.state.id}/>
                    </div>
                    {String(this.state.currentUser) === 'false'?
                 <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti vartototoją </Button>
                      : <span></span> }   
                 </div>
          </div>
              </React.Fragment> 
                  )}
              </UserContext.Consumer>
      );
    }
}

const style = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'10%',
    width: '70%'
  }
  const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}
export default SingleUser
