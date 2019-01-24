import React, { Component } from 'react';
import axios from 'axios';

export class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            book: {},
            quantity: '',
            price: '',
            status: '',
            bookTitle: '',
            selectValue: '',
            institutionBooks: [],
            institutionBook: {},
            title:this.props.title,
          };
          console.log(this.state.title)
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleQuantityChange = this.handleQuantityChange.bind(this);
          this.handlePriceChange = this.handlePriceChange.bind(this);
          this.handleStatusChange = this.handleStatusChange.bind(this);
          this.handleSelectChange = this.handleSelectChange.bind(this);
        }  

    componentDidMount = () => {
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

    handleQuantityChange(e) {  
        this.setState({ quantity: e.target.value });
    }

    handlePriceChange(e) {  
        this.setState({ price: e.target.value });
    }  

    handleStatusChange(e) {  
        this.setState({ status: e.target.value });
    }
    
    handleSelectChange(e) {  
        this.setState({ bookTitle: e.target.value });
      }


    handleSubmit(e) {
        e.preventDefault();

        const payload = {
            status: this.state.status,
            price: this.state.price,
            quantity: this.state.quantity,
            title: this.state.bookTitle
        }

    console.log("Payload  ", payload)
       axios.post(`http://localhost:8099/api/institutions/${this.state.title}`,  payload)
       .then(res => console.log("Send POST request", payload));
        
       this.setState({
            quantity: '',
            price: '',
            status: '',
            bookTitle: ''
        })
        this.props.onResultChange(payload)
      }

  render() {
    return (
      <div>
        <h4>Add book</h4>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" htmlFor="inputError1">Quantity</label>
              <input type="number" min="0" value={this.state.quantity} onChange={this.handleQuantityChange} placeholder="Enter quantity of selected book" className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" htmlFor="inputError1">Price</label>
              <input type="number" value={this.state.price} onChange={this.handlePriceChange}min="0" step="0.01" placeholder="Enter book price" className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" htmlFor="inputError1">Status</label>
              <input type="text" value={this.state.status} onChange={this.handleStatusChange} placeholder="Status" className="form-control" id="inputError1" required/>
            </div>
            <div>
                <label className="control-label">Select book</label>
                <select value={this.state.bookTitle} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>{this.state.books.map((book)=> <option key={book.title}>{book.title}</option>)}</select>
            </div>
            <button className="btn btn-primary" type="submit">Save</button>
            <br/>
            </form>
      </div>
    )
  }
}

export default AddBook
