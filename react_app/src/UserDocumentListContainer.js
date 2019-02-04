import React, { Component } from 'react';
import axios from 'axios';
import InstitutionListContainer from './InstitutionListContainer';


export class UserDocumentListContainer extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      documents:[],
      email: this.props.email
    }
    console.log("PROPS", this.props)
  }
  componentDidMount = () => {
    axios.get(`http://localhost:8099/api/documents/${this.state.email}/documents`)
          .then(result => {
            const documents = result.data
          this.setState({documents});
          console.log("Dokumentai", documents)
          })
          .catch(function (error) {
            console.log(error);
          });
  }
      
  render() {
    console.log("DOCUMENTS",this.state.documents)
    var DOCUMENTS = this.state.documents;
    return (
      <div>
        <InstitutionListContainer documents={DOCUMENTS} id={this.state.email}/>
      </div>
    )
  }
}

export default UserDocumentListContainer

