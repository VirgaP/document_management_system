import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';

export class UserDocument extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
          email:'virga@email.com',
          userDocumentStatus:[],
          message:'',
          document: props.current
        };
        console.log("dokas", this.state.document)
      }

    deleteDocument(number){
        alert("Ar tikrai norite ištrinti šį dokumentą?")
        axios.delete(`http://localhost:8099/api/documents/${number}`)
        .then(result => {
            console.log(result);
            this.props.deleteItem(number);
        //   const document = result.data
        // this.setState({document});
        const responseStatus = result.status
        console.log(result)
        if(responseStatus >= 200 && responseStatus < 300){ 
        alert('Dokumentas ištrintas !') }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    SubmitItem(number) {
        const payload = {
            email: this.state.email
        }
        axios.patch(`http://localhost:8099/api/documents/${number}/submit`, payload)
        .then(result => {
            console.log(result);
            const statusas = [] 
            this.state.document.userDocuments.filter(el=>statusas.push(el.submitted))
            console.log("statusas", statusas)
            this.props.updateStatus(number);
        const responseStatus = result.status
        console.log(result)
        if(responseStatus >= 200 && responseStatus < 300){ 
        alert('dokumento busena atnaujinta') }
        })
        .catch(function (error) {
          console.log(error);
        });   

    }
  render() {
    //   const statusas =  this.state.document.userDocuments.filter(el=>console.log(el.submitted))
    //   console.log("statusas", statusas)
    const {document} = this.state
    return (
        <tr key={document.number}>
        <td>{document.title}</td>
        <td>{document.description}</td>
        <td>{(document.type !=null) ? document.type.title : 'tipas nepriskirtas'}</td>
        <td>{document.createdDate}</td>
        <td>
        <Button type="primary">
            <Link to={`/dokumentas/${document.number}`}> Peržiūrėti </Link>
        </Button>
        </td>
        {document.userDocuments.map(el=>(String (el.submitted)) === 'false'? 
        <td>
        {/* <Button type="primary" onClick={this.SubmitItem.bind(this)}>Pateikti</Button> */}
        {/* <Button type="primary" onClick={() =>
         this.SubmitItem(document.userDocuments.map(el=>(el.submitted)))}>Pateikti</Button> */}
        <Button type="primary" onClick={() => this.SubmitItem(document.number)}>Pateikti</Button>
        </td> : 
        <td>
        <Button type="primary disabled">Pateikti</Button>
        </td>
        )}
        {document.userDocuments.map(el=>(String (el.submitted)) === 'true'? 
        <td>
        <Button type="danger disabled">Trinti</Button>
        </td> :
         <td>
        <Button type="danger" onClick={() => this.deleteDocument(document.number)}> Trinti </Button>
        </td>
         )}
        {document.userDocuments.map(el=>(String (el.submitted)) === 'true'? 
        <td>
            <Button type="default disabled">Redaguoti</Button>
        </td> :
        <td>
        <Button type="default">
            <Link to={`/redaguoti/dokumentas/${document.number}`}>Redaguoti</Link>
        </Button>
        </td>
        )}
      </tr>
      
      );

      
    
  }
}

export default UserDocument;   