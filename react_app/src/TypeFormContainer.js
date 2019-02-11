import React, {Component} from 'react';   
import SingleInput from './components/singleInput';
import axios from 'axios';
import {notification } from 'antd';
import 'antd/dist/antd.css';

class TypeFormContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        types: []
      };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleTypeTitleChange = this.handleTypeTitleChange.bind(this);
   
  }
  
  handleTypeTitleChange(e) {  
    this.setState({ title: e.target.value });
  }
  
  handleFormSubmit(e) {  
    e.preventDefault();

    const { types } = this.state,
    title = this.state.title
    this.setState({
      types: [...types, {
        title,
      }]
    })
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/types/new', {
      title: this.state.title,
        })
        .then(response => {
          console.log(response);
          const responseStatus = response.status
         if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumento tipas sukurtas sėkmingai!'
        });
        }
      })
        .catch(error => {
          if(error.status === 401) {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                    
          } else {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: error.message || 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                                            
          }
      });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    title: '',
  });
  }


  render() {
    return (
      <div className="container user_form">
      <form className="type_form" onSubmit={this.handleFormSubmit}>
        <h5>Sukurti dokumento tipą </h5>
        <SingleInput 
        inputType={'text'}
        title={'Dokumento tipas'}
        name={'title'}
        controlFunc={this.handleTypeTitleChange}
        content={this.state.title}
        placeholder={'Dokumento tipo pavadinimas'}
        /> 
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Saugoti"/>
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Išvalyti įvestus duomenis</button>
      </form>
      </div>
    );
    }
}
export default TypeFormContainer;