import React from 'react';
import BookComponent from './BookComponent';

const bookListComponent = (props) => {
    console.log(props)
    
    var BookList = props.books.map((book)=> {
        return(
        //   key={book.title}>
             <BookComponent 
             key={book.title}
             title={book.title}
             author={book.author}
             pageCount={book.pageCount}
             image = {book.image}
             />  
        
        );
        
     });
     
      return(
       <tbody>
           {BookList}
       </tbody>
      )
  
      }
export default bookListComponent;