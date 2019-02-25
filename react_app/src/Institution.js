import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';

export class Institution extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
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
            // this.props.deleteItem(id);
            this.props.deleteItem(number);
        //   const document = result.data
        // this.setState({document});
        const responseStatus = result.status
        console.log(result)
        if(responseStatus >= 200 && responseStatus < 300){ 
        alert('dokumentas istrintas') }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  render() {
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
      </tr>
      
      );
  }
}

export default Institution;   