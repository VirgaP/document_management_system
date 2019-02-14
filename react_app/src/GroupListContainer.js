import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class GroupListContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      groups: this.props.groups,
    }

      console.log("props Types", this.props)
    this.deleteGroup = this.deleteGroup.bind(this);
    }

    deleteGroup(name) {
      
      this.setState(prevState=>{
          const newItems = prevState.groups.filter((group)=>group.name!==name);
          return {
              groups: newItems
          }
      })
    }
     
  render() {
    console.log(this.props.groups)

    var rows = [];

    this.state.groups.map((group) => (
      rows.push(<Group group={group} key={group.name} deleteGroup={this.deleteGroup}/>)  
    ));
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
