import React, { Component } from 'react';
import BookListComponent from './components/bookListComponent';
import axios from 'axios';


export class BookListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [] 
          };
        }  

    componentDidMount() {
        axios.get('http://localhost:8099/api/books')
          .then(result => {
              const books = result.data;
              console.log(books);
            this.setState({ 
              books
            })
        })
            .catch(function (error) {
                console.log(error);
              }); 
      }
  render() {
    if(!this.state.books){
        return <div className="container">No books are available at the moment. Sorry ...</div>
    }
    return (
      <div>
          {/* {books.map(book =>
          <li key={book.title}>
            <a href={book.author}>{book.pageCount}</a>
          </li>
        )} */}
        <div className="container">
        <h2>List of available books</h2>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">No of pages</th>
            <th scope="col">Image</th>
            <th></th>
          </tr>
        </thead>
      
        <BookListComponent books={this.state.books}/>
    
        </table>
        </div>
      </div>
    )
  }
}

export default BookListContainer;
