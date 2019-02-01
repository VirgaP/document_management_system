import React, {Component} from 'react';   
import SingleInput from './components/singleInput';
import axios from 'axios';

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
  
    // const formPayload = {
    //   title: this.state.title,
    //   author: this.state.author,
    //   pageCount: this.state.pageCount,
    //   image: this.state.image,
    // };
  
    // console.log('Send this in a POST request:', formPayload);
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
  });
  }


  render() {
    return (
      <form className="container  book_form" onSubmit={this.handleFormSubmit}>
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
    );
    }
}
export default UserGroupFormContainer;