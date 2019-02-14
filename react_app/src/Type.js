import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, notification } from 'antd';
import axios from 'axios';

export class Type extends Component {
  
    DeleteItem = (title) => {
      console.log("props type", this.props.type.title)
        axios.delete(`http://localhost:8099/api/types/${this.props.type.title}`)
        .then(response => {
          console.log("Response", response);
          this.props.deleteType(title);
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
        <td>{this.props.type.title}</td>
        <td>
        <Button type="default">
            <Link to={`/tipas/${this.props.type.title}`} > Peržiūrėti </Link>
        </Button>
        </td>
        <td>
        {/* <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti </Button> */}
        <Button type="danger" onClick={() => this.DeleteItem(this.props.type.title)}> Trinti </Button>
        </td>
        <td>
        <Button type="default">
            <Link to={`/redaguoti/tipas/${this.props.type.title}`}> Redaguoti </Link>
        </Button>
        </td>
      </tr>);
    
  }
}

export default Type
