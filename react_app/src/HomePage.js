import React, { Component } from 'react'
import BookListContainer from './BookListContainer';
import axios from 'axios';
import InstitutionListContainer from './InstitutionListContainer';


export class HomePage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      institutions:[]
    }
  }
  componentDidMount = () => {
    axios.get('http://localhost:8099/api/institutions')
          .then(result => {
            const institutions = result.data
          this.setState({institutions});
          console.log("Institucijos", institutions)
          })
          .catch(function (error) {
            console.log(error);
          });
  }
      
  render() {
    var INSTITUTIONS = this.state.institutions;

    return (
      <div>
        {/* <BookListContainer/> */}
        <InstitutionListContainer institutions={INSTITUTIONS}/>
      </div>
    )
  }
}

export default HomePage
