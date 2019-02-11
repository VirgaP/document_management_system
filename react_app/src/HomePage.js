import React, { Component } from 'react'
import axios from 'axios';
import DocumentListContainer from './DocumentListContainer';
import GroupListContainer from './GroupListContainer';
import TypeListContainer from './TypeListContainer';
import NavbarContainer from './NavbarContainer';
import LoginForm from './Login';


export class HomePage extends Component {

  constructor(props) {
    super(props)

      this.state = {
      documents:[],
      groups:[],
      types:[],
      showLoginForm: false
    }

    this.handleInput=this.handleInput.bind(this);  
  }

  handleInput(event){
    let value = event.target.value;
    this.setState({
      input:value
    });
  }
  fetchData() {
    axios.get('http://localhost:8099/api/documents')
        .then(response => {
            this.setState({
                documents: response.data
            });
        })
        .catch(error => {
            this.setState({
                error: 'Error while fetching data.'
            });
        });
    }

  componentDidMount = () => {
    // axios.get('http://localhost:8099/api/documents')
    //       .then(result => {
    //         const documents = result.data
    //       this.setState({documents});
    //       console.log("Dokumentai", documents)
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });

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

  render(){
  const {showLoginForm}= this.state; 
    var DOCUMENTS = this.state.documents;
    var GROUPS = this.state.groups;
    var TYPES = this.state.types;
    return (
      <div>
       <div onShowLoginForm={() =>{
         this.setState({
           showLoginForm:true,
         });
       }}></div>
       {showLoginForm ? <LoginForm/> : null}
        <h1>{this.state.input}</h1>
        <DocumentListContainer documents={DOCUMENTS}/>
        <GroupListContainer groups={GROUPS}/>
        <TypeListContainer types={TYPES}/>
      </div>
    )
  }
}

export default HomePage
