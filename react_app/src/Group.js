import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button, notification } from 'antd';
import axios from 'axios';


export class Group extends Component {

    DeleteItem = (name) => {
        axios.delete(`http://localhost:8099/api/group/${this.props.group.name}`)
        .then(response => {
          console.log("Response", response);
          this.props.deleteGroup(name);
          const responseStatus = response.status
         console.log(responseStatus)
        if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Įrašas ištrintas sėkmingai!'
        }); 
         }
      })
      .catch(error => {
        console.log(error)
            notification.error({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Įrašo ištrinti negalima!'
            });                    
        })
    }
  render() {
    return (
        <tr>
        <td>{this.props.group.name}</td>
        <td>
        <Button type="default">
            <Link to={`/grupe/${this.props.group.name}`}> Peržiūrėti </Link>        
        </Button>
        </td>
        <td>
        <Button type="danger" onClick={() => this.DeleteItem(this.props.group.name)}> Trinti </Button>
        </td>
        <td>
        <Button type="default">
            <Link to={`/redaguoti/grupe/${this.props.group.name}`}> Redaguoti </Link>
        </Button>
        </td>
       
      </tr>);
    
  }
}

export default Group;  