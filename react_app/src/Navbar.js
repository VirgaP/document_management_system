import React, { Component } from 'react';
// import './App.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class Navbar extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      current: '/pagrindinis',
    }
}
 
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key === "logout") {
      this.props.onLogout();
    }
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="/pagrindinis">
          <Link to="/pagrindinis">
                <Icon type="home" className="nav-icon" /> brkdbr
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="user" />Atsijungti
        </Menu.Item>
      </Menu>
    );
  }
  
}

export default Navbar;