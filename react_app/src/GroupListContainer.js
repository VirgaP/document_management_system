import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class GroupListContainer extends Component {
      
  render() {
    console.log(this.props.groups)

    var rows = [];
    this.props.groups.forEach(function(group) {
      rows.push(<Group group={group} />);   
    });
    return (
    <div className="container">
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th>žiūrėti</th><th>trinti</th><th>redaguoti</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    </div>  
      );
  }
}

export default GroupListContainer
