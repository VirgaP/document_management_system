import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddBook from './AddBook';


const confirm = Modal.confirm;

export class SingleInstitution extends Component {
  
    constructor(props) {
        super(props)
          
        this.state = {
           title: this.props.match.params.title, 
           institution: {},  
           books: [], 
           booksArray:[],
           image:'',
           visible: false 
           
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleResultChange = this.handleResultChange.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
        // this.showConfirm = this.showConfirm.bind(this);
      }
      
       showDeleteConfirm=()=> {
       
        confirm({
          title: 'Are you sure delete this item?',
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
            
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      handleResultChange(value) {
        console.log("VALUE", value)
        var newArray = this.state.booksArray.slice();    
        newArray.push(value);   
        this.setState({booksArray:newArray})
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/institutions/${this.state.title}`)
          .then(result => {
            const institution = result.data;
          this.setState({institution});
          const image = result.data.image;
          this.setState({image});
          const books = result.data.institutionBooks;
          this.setState({books});
          console.log(institution)
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      

      handleRemove (index) {
       this.showDeleteConfirm();
        const payload = {title: index}
        var list = this.state.books;
       
        let bookIdx = this.state.books.findIndex((book) => book.book.title === index); //find array elem index by title/index
        const newList = list.splice(bookIdx, 1); //delets element and returns updated list of books
        this.setState({ boks: newList }); 

        axios.delete(`http://localhost:8099/api/institutions/${this.state.title}/removeBook`, {data: payload})
            .then(res => {
              console.log(res)
              console.log('it works')
          })
          .catch(function (error) {
              console.log(error);
          }); 
        
      }

    render() {

     console.log("Dynamice BOOKS", this.state.booksArray)
     console.log("DB BOOKS", this.state.books)

      var imgs={
        vaga: require('./images/vaga.jpeg'),
        vtvpmc: require('./images/vtvpmc.jpg')
      }
      return (
          <UserProvider>
          <UserContext.Consumer>
             {(context)=> (  
              <React.Fragment>  
          <div style={username}>You are now logged in as : {context}</div>
  
           <div className="container" style={style}>

           <div className="card h-100">
              <a href="#"><img className="card-img-top" 
              src={this.state.institution.image === "vaga"? imgs.vaga : "http://placehold.it/700x400" ||this.state.institution.image === "vtvpmc"? imgs.vtvpmc : "http://placehold.it/700x400"}              
              alt={this.state.institution.image}>
              </img></a>
              {this.state.books.length < 2 
                  ? ( <div class="alert alert-danger" role="alert">Total of {this.state.books.length} book(s) are added. Need to contain at least 3 books</div> ) 
                  :   null 
              }
              <div className="card-body row">
                <div className="col-lg-3 col-md-12">
                      <h3 className="card-title">{this.state.institution.title}
                      </h3>
                      <h5>{this.state.institution.city}</h5>
                      <h5>{this.state.institution.category}</h5>
                      <h5>{this.state.institution.type}</h5>
                  </div>
                  <div className="col-lg-9 col-md-12">
                  <h4>Books in institution</h4>
                 
                    <div>
                    <h5>You added following books, refresh page to see updated list.</h5>
                    <ul>{this.state.booksArray.map((book)=>
                  <li key={book.title}>{book.title}, q: {book.quantity}, {book.price} EUR </li> 
                  )}
                  </ul> 
                    </div>

                  <ul>{this.state.books.map((book)=>
                 <li key={book.book.title}><a href='#'>{book.book.title}</a>, by {book.book.author}, number of pages: {book.book.pageCount} (Quantity: {book.quantity}, Price: {book.price} EUR) 
                 
                  <button className="btn-default" 
                  onClick={this.handleRemove.bind(this, book.book.title)}
                  >x</button>
                  </li> 
                  )}
                  </ul>
                  </div>
              </div>
              <div className="card-footer">
              <AddBook 
              onResultChange={this.handleResultChange}
              title={this.state.title}/>
              </div>
            </div>
          </div>
              </React.Fragment> 
                  )}
              </UserContext.Consumer>
              </UserProvider>
      );
    }
}

const style = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'20px',
    width: '70%'
  }
  const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}

export default SingleInstitution
