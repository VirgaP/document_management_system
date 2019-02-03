import React, { Component } from 'react';
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';

export class Type extends Component {
    DeleteItem = (event) => {
        axios.delete(`http://localhost:8099/api/group/${this.props.group.name}`)
        .then(result => {
          const type = result.data
        this.setState({type});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  render() {
     
    return (
        <tr>
        <td>{this.props.type.title}</td>
        <td>
        <Button type="default">
            <Link to={`/type/${this.props.type.title}`}> Peržiūrėti </Link>
        </Button>
        </td>
        <td>
        <Button type="danger" onClick={this.DeleteItem.bind(this)}> Trinti </Button>
        </td>
        <td>
        <Button type="default">
            <Link to={`/edit/type/${this.props.type.title}`}> Redaguoti </Link>
        </Button>
        </td>
      </tr>);
    
  }
}

export default Type
