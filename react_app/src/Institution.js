import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';


export class Institution extends Component {

    constructor() {
        super();
       
        this.state = {
          email:'user@email.com',
        };
        
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
      console.log("Dokumentas", this.props.document)
    return (
        <tr>
        <td>{this.props.document.title}</td>
        <td>{this.props.document.description}</td>
        <td>{this.props.document.type.title}</td>
        <td>{this.props.document.createdDate}</td>
        <td>
        <Button type="primary">
            <Link to={`/institution/${this.props.document.number}`}> Peržiūrėti </Link>
        </Button>
        </td>
        <td>
        <Button type="primary" onClick={this.SubmitItem.bind(this)}>Pateikti</Button>
        </td>
        <td>
        <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti </Button>
        </td>
        <td>
        <Button type="default">
            <Link to={`/edit/institution/${this.props.document.number}`}> Redaguoti </Link>
        </Button>
        </td>
       
      </tr>);
    
  }
}

export default Institution;   