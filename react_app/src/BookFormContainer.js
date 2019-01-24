import React, {Component} from 'react';   
import SingleInput from './components/singleInput';
import axios from 'axios';

class BookFormContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        author: '',
        pageCount: 0,
        image: '',
        institutions: []
      };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleBookTitleChange = this.handleBookTitleChange.bind(this);
    this.handleBookAuthorChange = this.handleBookAuthorChange.bind(this);
    this.handlePageCountChange = this.handlePageCountChange.bind(this);
    this.handleBookImageChange = this.handleBookImageChange.bind(this);
  }
  

  handleBookTitleChange(e) {  
    this.setState({ title: e.target.value });
  }
  handleBookAuthorChange(e) {  
    this.setState({ author: e.target.value });
  }

  handlePageCountChange(e) {  
    this.setState({ pageCount: e.target.value });
  }
  handleBookImageChange(e) {  
    this.setState({ image: e.target.value });
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
    const { institutions } = this.state,
    title = this.state.title,
    author = this.state.author,
    pageCount = this.state.pageCount,
    image = this.state.image
    this.setState({
      institutions: [...institutions, {
        title,
        author,
        pageCount,
        image,
      }]
    })
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/books/new', {
      title: this.state.title,
      author: this.state.author,
      pageCount: this.state.pageCount,
      image: this.state.image,
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
    author: '',
    pageCount: 0,
    image: ''
  });
  }


  render() {
    return (
      <form className="container  book_form" onSubmit={this.handleFormSubmit}>
        <h5>Add new Book </h5>
        <SingleInput 
        inputType={'text'}
        title={'Book title'}
        name={'title'}
        controlFunc={this.handleBookTitleChange}
        content={this.state.title}
        placeholder={'Type book title here'}
        /> 
        <SingleInput 
        inputType={'text'}
        title={'Book author'}
        name={'author'}
        controlFunc={this.handleBookAuthorChange}
        content={this.state.author}
        placeholder={'Type book author here'}
        /> 
        <SingleInput 
        inputType={'number'}
        title={'Book page count'}
        name={'pageCount'}
        controlFunc={this.handlePageCountChange}
        content={this.state.pageCount}
        placeholder={'Enter book page count'}
        />
        <SingleInput 
        inputType={'text'}
        title={'Book image'}
        name={'image'}
        controlFunc={this.handleBookImageChange}
        content={this.state.image}
        placeholder={'Type book image name here'}
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