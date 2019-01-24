import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';

export class SingleBook extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           id: this.props.match.params.title, //is index.js paima url paima productId
           book: {},          
        }
        console.log("id", this.state.id);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/books/${this.state.id}`)
          .then(result => {
            const book = result.data
          this.setState({book});
          })
          .catch(function (error) {
            console.log(error);
          });
        
        
      }
  
      DeleteItem = (event) => {
          axios.delete(`http://localhost:8099/api/books/${this.state.id}`)
          .then(result => {
            const book = result.data
          this.setState({book});
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.props.history.push('/') //redirects Home after delete
      }
      
  
    render() {
     console.log("params url: ", this.props.match.params.title)
      return (
          <UserProvider>
          <UserContext.Consumer>
             {(context)=> (  
              <React.Fragment>  
          <div style={username}>You are now logged in as : {context}</div>
  
           <div className="container" style={style}>
           <div className="card h-100">
              <a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt={this.state.book.image}></img></a>
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    <h5>{this.state.book.title}</h5>
                    <h5>{this.state.book.author}</h5>
                    <h5>{this.state.book.pageCount} EUR</h5>
              </div>
              <div className="card-footer">
                <p>Rating &nbsp;    
                </p>
                {/* <AddInsTituTion context={context} product={this.state.product}/> */}
                 {/* <Button type="default" onClick={this.addToCart.bind(this)}> Add to cart </Button>  */}
                 &nbsp; &nbsp; 
                 <Button type="danger" onClick={this.DeleteItem.bind(this)}> Delete </Button>
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
export default SingleBook
