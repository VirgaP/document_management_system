import React, { Component } from 'react'
import BookListContainer from './BookListContainer';
import axios from 'axios';
import InstitutionListContainer from './InstitutionListContainer';


export class HomePage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      documents:[]
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
  }
      
  render() {
    var DOCUMENTS = this.state.documents;

    return (
      <div>
        {/* <BookListContainer/> */}
        <InstitutionListContainer documents={DOCUMENTS}/>
      </div>
    )
  }
}

export default HomePage
