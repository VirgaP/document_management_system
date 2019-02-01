import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Type from './Type';

export class TypeListContainer extends Component {
      
  render() {
    console.log(this.props.types)

    var rows = [];
    this.props.types.forEach(function(type) {
      rows.push(<Type type={type} />);   
    });
    
    return (

    <div className="container">
    <h4>Dokumento tipai</h4>
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th>trinti</th><th>redaguoti</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    
    </div>  
      );

  }
}


export default TypeListContainer
