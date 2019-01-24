import React, {Component} from 'react';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      redirect: false,
    }
  }
 
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
        
      })
    }

  componentDidMount = () => {
    
  }
  
  onSubmit = () => {
  axios.post('http://localhost:8099/api/users', {
    username : this.state.username,
})
.then((response) => {
  console.log("NEW USER:", response)
})
  this.setRedirect();
}
   
  render() {
  
    return (
      <div className="container user_form">
      <h2>Register new user</h2>
        <Input
          name='username'
          placeholder='Username'
          onChange={e => this.onChange(e)}
          value={this.state.username} />
          <br />
        {this.renderRedirect()}
        <Button size="large" onClick={() => this.onSubmit()} type="primary">Register!</Button>
       </div>
    );
  }
}
 
export default Register;