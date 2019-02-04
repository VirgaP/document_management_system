import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddBook from './AddBook';


const confirm = Modal.confirm;

export class SingleInstitution extends Component {
  
    constructor(props) {
        super(props)
          
        this.state = {
           number: this.props.match.params.number, 
           email:'user@email.com',
           document: {},
           userDocument:[],
           user:[]  
        }
       
      }
    
      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/documents/${this.state.number}`)
        .then(result => {
        const document = result.data
        this.setState({document});
        console.log("Document", document)

        const user= []
        document.userDocuments.forEach(element => {
          if(element.document.id === element.primaryKey.document.id){
            user.push(element.user)
          }
        });

        const userDocument = [];
        document.userDocuments.forEach(element => {
          if(element.document.id === element.primaryKey.document.id){
            userDocument.push(element)
          }
        });
        console.log(userDocument)
        console.log("User", user)
        this.setState({user});
        this.setState({userDocument})
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
  
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">Pavadinimas {this.state.document.title}</h4>
                    <h5>sukurimo data: {this.state.document.createdDate}</h5>
                    <h5>Dokumento nr.: {this.state.document.number}</h5>
                    <h5>Dokumento tipas: {(this.state.document.type !=null) ? this.state.document.type.title : 'tipas nepriskirtas'}</h5>
                    <h5>Vartotojas: {this.state.user.map(el=>el.name + ' ' + el.surname)}</h5>
                    <h5>Vartotojo el.paštas: {this.state.user.map(el=>el.email)}</h5>

                    <h5>Dokumento būsena: 
                      <br></br>
                    {this.state.userDocument.map(el=>(String (el.saved)) === 'true' ? 'sukurtas' : 'neišsaugotas' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.submitted)) === 'true' ? 'pateiktas' : 'nepateiktas' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.confirmed)) === 'true' ? 'patvirtintas' : 'nepatvirtintas' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.rejected)) === 'true' ? 'atmestas' : 'neatmestas' 
                    )}  
                     </h5>
              </div>
              </div>
              <div className="card-footer">
              <p>{this.state.document.description}</p>
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

export default SingleInstitution
