import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserGroupFormContainer from './UserGroupFormContainer';

export class GroupListContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      groups: []
    }

      console.log("props Types", this.props)
    this.deleteGroup = this.deleteGroup.bind(this);
    }

    componentDidMount = () => {

      axios.get('http://localhost:8099/api/group')
      .then(result => {
        const groups = result.data
      this.setState({groups});
      console.log("Grupes", groups)
      })
      .catch(function (error) {
        console.log(error);
      });
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

    var rows = [];

    this.state.groups.map((group) => (
      rows.push(<Group group={group} key={group.name} deleteGroup={this.deleteGroup}/>)  
    ));
    return (
    <div className="container item-list">
    <h5>Vartotojų grupės</h5>
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
