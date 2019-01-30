import React, {Component} from 'react';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import SingleInput from './components/singleInput'
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      email:'',
      redirect: false,
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }
 
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/' />
  //   }
  // }

  handleNameChange(e) {  
    this.setState({ name: e.target.value });
  }

  handleSurnameChange(e) {  
    this.setState({ surname: e.target.value });
  }

  handleEmailChange(e) {  
    this.setState({ email: e.target.value });
  }

  handleFormSubmit(e) {  
    e.preventDefault();
  
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/users/new', {
      name: this.state.name,
      surname: this.state.surname,
      email:this.state.email
        })
        .then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    name: '',
    surname: '',
    email:''
  });
  
}
  render() {
  
    return (
      <div className="container user_form">
      <h2>Register new user</h2>
      <form className="container  book_form" onSubmit={this.handleFormSubmit}>
      <SingleInput 
        inputType={'text'}
        title={'Vartotojo vardas'}
        name={'name'}
        controlFunc={this.handleNameChange}
        content={this.state.title}
        placeholder={'Vartotojo vardas'}
        /> 
        <SingleInput 
        inputType={'text'}
        title={'Vartotojo pavarde'}
        name={'name'}
        controlFunc={this.handleSurnameChange}
        content={this.state.surname}
        placeholder={'Vartotojo pavarde'}
        /> 
        <SingleInput 
        inputType={'text'}
        title={'Vartotojo el.pastas'}
        name={'name'}
        controlFunc={this.handleEmailChange}
        content={this.state.email}
        placeholder={'Vartotojo el.pastas'}
        /> 
          
        {/* {this.renderRedirect()} */}

        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Submit"/>
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Clear form</button>
      </form>
       </div>
    );
  }
}
 
export default Register;