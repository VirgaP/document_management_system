import React, {Component} from 'react';   
import SingleInput from './components/singleInput';
import axios from 'axios';
import {notification } from 'antd';
import 'antd/dist/antd.css';
import UserDocumentListContainer from './UserDocumentListContainer';
import GroupListContainer from './GroupListContainer';

class UserGroupFormContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        groups: []
      };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
   
  }
  

  handleGroupNameChange(e) {  
    this.setState({ name: e.target.value });
  }
  
  handleFormSubmit(e) {  
    e.preventDefault();
  
    const { groups } = this.state,
    name = this.state.name
    this.setState({
      groups: [...groups, {
        name,
      }]

    })
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/group/new', {
      name: this.state.name,
        })
        .then(response => {
          console.log(response);
          const responseStatus = response.status
         if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Vartotojų grupė sukurta sėkmingai!'
        });
        }
      })
        .catch(error => {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                    
      });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    name: '',
  });
  }


  render() {
    return (
      
      <div className="container new-form">
       <form className="container" id="type_form" onSubmit={this.handleFormSubmit}>
        <h5>Sukurti vartotojų grupę </h5>
        <SingleInput 
        inputType={'text'}
        title={'Grupės pavadinimas'}
        name={'name'}
        controlFunc={this.handleGroupNameChange}
        content={this.state.name}
        placeholder={'Grupės pavadinimas'}
        /> 
      
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Išsaugoti"/>
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Išvalyti formą</button>
      </form>
      </div>
    
    );
    }
}
export default UserGroupFormContainer;