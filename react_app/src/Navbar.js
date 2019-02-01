import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import InstitutionList from './InstitutionListContainer';
import axios from 'axios';




class Navbar extends Component {
  
  
  constructor(props) {
    super(props)
  
    this.state = {
      institutions:[]
    }
  }
  
  // goProducts = (props) => this.props.history.push("products");
  render() {
    return (    
        // <!-- Navigation -->
        <UserProvider>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            {/* <a className="navbar-brand" href="#">Home</a> */}
            <Link className="navbar-brand" to='/'>Home</Link> 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to='/'> Home</Link> 
                    <span className="sr-only">(current)</span>
                </li>
                <li className="nav-item">
        {/* <UserContext.Consumer>
        {(context)=> (
            <Link className="nav-link" to={`/cart/${context}`}>Cart<FontAwesomeIcon icon="shopping-cart"/>
            </Link> 
        )}
        </UserContext.Consumer> */}
              </li>
                <li className="nav-item">
                <Link className="nav-link" to='/register'>Kurti naują vartotoją</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to='/booksList'>Books</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to='/groups'>Kurti vartotojų grupę </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to='/books'>Kurti dokumento tipą</Link> 
                  {/* <a className="nav-link" onClick={this.goProducts} href="/products">Products</a> */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/admin'>Kurti dokumentą</Link> 
                </li>
              </ul>
            </div>
          </div>
          {/* <p><button onClick={this.goProducts}
      className="btn btn-primary">Go to Products</button></p> */}
        </nav>
        </UserProvider>
      
    );
  }
}

export default Navbar;