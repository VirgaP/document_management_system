import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';


export class Institution extends Component {

    DeleteItem = (event) => {
        axios.delete(`http://localhost:8099/api/institutions/${this.props.institution.title}`)
        .then(result => {
          const institution = result.data
        this.setState({institution});
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }
  render() {
      console.log("INSTITUVCIJA", this.props.institution)
    return (
        <tr>
        <td>{this.props.institution.title}</td>
        <td>{this.props.institution.city}</td>
        <td>{this.props.institution.category}</td>
        <td>{this.props.institution.type}</td>
        <td>{this.props.institution.subtype}</td>
        <td>
        <Button type="primary">
            <Link to={`/institution/${this.props.institution.title}`}> View </Link>
        </Button>
        </td>
        <td>
        <Button type="danger" onClick={this.DeleteItem.bind(this)}> Delete </Button>
        </td>
        <td>
        <Button type="default">
            <Link to={`/edit/institution/${this.props.institution.title}`}> Edit </Link>
        </Button>
        </td>
       
      </tr>);
    
  }
}

export default Institution;   