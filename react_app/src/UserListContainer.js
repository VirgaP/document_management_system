import React, { Component } from 'react';
import UserListComponent from './components/userListComponent';
import axios from 'axios';


export class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [] 
          };
        }  

    componentDidMount() {
        axios.get('http://localhost:8099/api/users')
          .then(result => {
              const users = result.data;
              console.log(users);
            this.setState({ 
              users
            })
        })
            .catch(function (error) {
                console.log(error);
              }); 
      }
  render() {
    if(!this.state.users){
      return <div className="container">Šiuo metu registruotų vartotojų nėra</div>
  }
    return (
      <div>
          {/* {books.map(book =>
          <li key={book.title}>
            <a href={book.author}>{book.pageCount}</a>
          </li>
        )} */}
        <div className="container">
        <h4>Registruoti vartotojai</h4>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Vardas</th>
            <th scope="col">Pavardė</th>
            <th scope="col">El. paštas</th>
            <th scope="col">Vartotojų grupė</th>
            <th></th>
          </tr>
        </thead>
      
        <UserListComponent users={this.state.users}/>
    
        </table>
        </div>
      </div>
    )
  }
}

export default UserListContainer;
