import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';


export class Group extends Component {

    DeleteItem = (event) => {
        axios.delete(`http://localhost:8099/api/group/${this.props.group.name}`)
        .then(result => {
          const group = result.data
        this.setState({group});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  render() {
    return (
        <tr>
        <td>{this.props.group.name}</td>
        <td>
        <Button type="default">
            <Link to={`/group/${this.props.group.name}`}> Peržiūrėti </Link>        
        </Button>
        </td>
        <td>
        <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti </Button>
        </td>
        <td>
        <Button type="default">
            <Link to={`/edit/group/${this.props.group.name}`}> Redaguoti </Link>
        </Button>
        </td>
       
      </tr>);
    
  }
}

export default Group;  