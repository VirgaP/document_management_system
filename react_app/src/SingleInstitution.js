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
          //  number: this.props.match.params.number, 
           groups:[],
           groupName:'',
           email:'user@email.com',
           document: {},  
           books: [], 
           groupsArray:[],
           userGroups:[]
        }
        this.handleResultChange = this.handleResultChange.bind(this);
        // this.showConfirm = this.showConfirm.bind(this);
      }
      
      

      handleResultChange(value) {
        console.log("VALUE", value)
        var newArray = this.state.booksArray.slice();    
        newArray.push(value);   
        this.setState({booksArray:newArray})
      }
    
      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/users/${this.state.email}`)
        .then(result => {
        const user = result.data
        this.setState({user});
        var userGroups = result.data.userGroups.map(group=>group.name);
        this.setState({userGroups})
        console.log("USERIS", user)
        console.log('Grupes', userGroups)
        })
        .catch(function (error) {
          console.log(error);
        });

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

      

      handleRemove (index) {
       this.showDeleteConfirm();
        const payload = {title: index}
        var list = this.state.books;
       
        let bookIdx = this.state.books.findIndex((book) => book.book.title === index); //find array elem index by title/index
        const newList = list.splice(bookIdx, 1); //delets element and returns updated list of books
        this.setState({ boks: newList }); 

        axios.delete(`http://localhost:8099/api/user/${this.state.email}/removeGroup`, {data: payload})
            .then(res => {
              console.log(res)
              console.log('it works')
          })
          .catch(function (error) {
              console.log(error);
          }); 
        
      }

    render() {

      return (
          <UserProvider>
          <UserContext.Consumer>
             {(context)=> (  
              <React.Fragment>  
          <div style={username}>You are now logged in as : {context}</div>
  
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    <h5>Vardas: {this.state.user.name}</h5>
                    <h5>Pavardė: {this.state.user.surname}</h5>
                    <h5>El.paštas: {this.state.user.email}</h5>
                    <h5>Vartotojo rolė: {String(this.state.user.admin) === 'true' ? 'administratorius' : 'vartototojas'}</h5> 
                    {/* converts boolean to String */}
                    <div>
                      <h5>Vartotojo grupės: </h5> 
                    {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}
                        <button className="btn-default" 
                  onClick={this.handleRemove.bind(this, group.name)}
                  >x</button>
                        </li>))}</ul>}
                    </div>
                    <div>
                    <h5>You added following books, refresh page to see updated list.</h5>
                    <ul>{this.state.groupsArray.map((newGroup)=>
                  <li key={newGroup.name}>{newGroup.name}</li> 
                  )}
                  </ul> 
                    </div>
{/* 
                  <ul>{this.state.books.map((book)=>
                 <li key={book.book.title}><a href='#'>{book.book.title}</a>, by {book.book.author}, number of pages: {book.book.pageCount} (Quantity: {book.quantity}, Price: {book.price} EUR) 
                 
                  <button className="btn-default" 
                  onClick={this.handleRemove.bind(this, book.book.title)}
                  >x</button>
                  </li> 
                  )}
                  </ul> */}
                  </div>
              </div>
              <div className="card-footer">
              <AddBook 
              onResultChange={this.handleResultChange}
              email={this.state.user.email}/>
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
