import React, {Component} from 'react';   
import SingleInput from './components/singleInput';
import axios from 'axios';

class BookFormContainer extends Component {  
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
  
    // const formPayload = {
    //   title: this.state.title,
    //   author: this.state.author,
    //   pageCount: this.state.pageCount,
    //   image: this.state.image,
    // };
  
    // console.log('Send this in a POST request:', formPayload);
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
        .then(function(response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    title: '',
  });
  }


  render() {
    return (
      <form className="container  book_form" onSubmit={this.handleFormSubmit}>
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
          value="Submit"/>
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Clear form</button>
      </form>
    );
    }
}
export default BookFormContainer;