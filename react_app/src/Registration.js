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
      groups:[],
      groupName:'',
      admin: false,
      redirect: false,
      
    }
    console.log("Admin state", this.state.admin)
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
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
  componentDidMount = () => {
    axios.get('http://localhost:8099/api/group')
    .then(result => {
        const groups = result.data;
        console.log(groups);
      this.setState({ 
        groups
      })
  })
      .catch(function (error) {
          console.log(error);
        });
  }

  handleNameChange(e) {  
    this.setState({ name: e.target.value });
  }

  handleSurnameChange(e) {  
    this.setState({ surname: e.target.value });
  }

  handleEmailChange(e) {  
    this.setState({ email: e.target.value });
  }
  handleSelectChange(e) {  
    this.setState({ groupName: e.target.value });
  }

  handleChangeAdmin(event){
    this.setState({ admin : event.target.checked });

      console.log("Admin", this.state.admin)
    }
  
  handleFormSubmit(e) {  
    e.preventDefault();
  
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/users/new', {
      name: this.state.name,
      surname: this.state.surname,
      email:this.state.email,
      groupName: this.state.groupName,
      admin: this.state.admin,
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
    name:'',
    surname:'',
    email:'',
    groupName:'',
    admin: false,
  });
  
}
  render() {
  
    return (
      <div className="container user_form">
      <h2>Kurti naują vartotoją</h2>
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
        name={'surname'}
        controlFunc={this.handleSurnameChange}
        content={this.state.surname}
        placeholder={'Vartotojo pavarde'}
        /> 
        <SingleInput 
        inputType={'text'}
        title={'Vartotojo el.pastas'}
        name={'email'}
        controlFunc={this.handleEmailChange}
        content={this.state.email}
        placeholder={'Vartotojo el.pastas'}
        /> 
        <div>
                <label className="control-label">Pasirinkite vartotojo grupę</label>
                <select value={this.state.groupName} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>{this.state.groups.map((type)=> <option key={type.name}>{type.name}</option>)}</select>
            </div>
             <div>
            <label className="form-label capitalize">
            <input
                type="checkbox"
                checked={this.state.admin}
                onChange={this.handleChangeAdmin}
              />Admin 
         </label>
       </div>
 
          
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