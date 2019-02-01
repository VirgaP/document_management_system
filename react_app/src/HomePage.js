import React, { Component } from 'react'
import axios from 'axios';
import InstitutionListContainer from './InstitutionListContainer';
import GroupListContainer from './GroupListContainer';
import TypeListContainer from './TypeListContainer';


export class HomePage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      documents:[],
      groups:[],
      types:[]
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:8099/api/documents')
          .then(result => {
            const documents = result.data
          this.setState({documents});
          console.log("Dokumentai", documents)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get('http://localhost:8099/api/group')
          .then(result => {
            const groups = result.data
          this.setState({groups});
          console.log("Grupes", groups)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get('http://localhost:8099/api/types')
          .then(result => {
            const types = result.data
          this.setState({types});
          console.log("Tipai", types)
          })
          .catch(function (error) {
            console.log(error);
          });
  }
      
  render() {
    var DOCUMENTS = this.state.documents;
    var GROUPS = this.state.groups;
    var TYPES = this.state.types;
    return (
      <div>
        <InstitutionListContainer documents={DOCUMENTS}/>
        <GroupListContainer groups={GROUPS}/>
        <TypeListContainer types={TYPES}/>
      </div>
    )
  }
}

export default HomePage
