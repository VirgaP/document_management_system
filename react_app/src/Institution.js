import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';


export class Institution extends Component {

    constructor() {
        super();
       
        this.state = {
          email:'user@email.com',
          userDocumentStatus:[]
        };
        
      }
      componentDidMount = () => {
        const userDocumentStatus = [];
        this.props.document.userDocuments.forEach(element => {
            userDocumentStatus.push(element)
            // console.log("From foreach", element)
        });
        this.setState({userDocumentStatus})
      }
      
    DeleteItem = (event) => {
        axios.delete(`http://localhost:8099/api/documents/${this.props.document.number}`)
        .then(result => {
          const document = result.data
        this.setState({document});
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    SubmitItem = (event) => {
        const payload = {
            email: this.state.email
        }
        axios.post(`http://localhost:8099/api/documents/${this.props.document.number}/submit`, payload)
        .then(res => console.log("Send POST request", payload))
        .catch(function (error) {
          console.log(error);
        });    
    }
    
  render() {
      console.log("Dokumentas in Institution", this.props.document)
      console.log("Status", this.state.userDocumentStatus)
    return (
        <tr>
        <td>{this.props.document.title}</td>
        <td>{this.props.document.description}</td>
        <td>{(this.props.document.type !=null) ? this.props.document.type.title : 'tipas nepriskirtas'}</td>
        <td>{this.props.document.createdDate}</td>
        <td>
        <Button type="primary">
            <Link to={`/document/${this.props.document.number}`}> Peržiūrėti </Link>
        </Button>
        </td>
        {this.state.userDocumentStatus.map(el=>(String (el.submitted)) === 'false'? 
        <td>
        <Button type="primary" onClick={this.SubmitItem.bind(this)}>Pateikti</Button>
        </td> : 
        <td>
        <Button type="primary disabled">Pateikti</Button>
        </td>
        )}
        {this.state.userDocumentStatus.map(el=>(String (el.submitted)) === 'true'? 
        <td>
        <Button type="danger disabled">Trinti</Button>
        </td> :
         <td>
        <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti </Button>
        </td>
         )}

        {this.state.userDocumentStatus.map(el=>(String (el.submitted)) === 'true'? 
        <td>
            <Button type="default disabled">Redaguoti</Button>
        </td> :
        <td>
        <Button type="default">
            <Link to={`/edit/document/${this.props.document.number}`}>Redaguoti</Link>
        </Button>
        </td>
        )}
      </tr>);
    
  }
}

export default Institution;   