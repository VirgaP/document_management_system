// import React from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const NavbarContainer = (props) =>{
//     return(
//         <div>
//             <div>
//                 {/* <Navbar history={props.history}/> */}
//                 <Navbar/>
//             </div>
//               {props.children}
//               <Footer/>
//         </div>
//     );
// }

// export default NavbarContainer;

import React, { Component } from 'react';
import './index.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from './security/apiUtil';
import { ACCESS_TOKEN } from './index';

// import PollList from '../poll/PollList';
// import NewPoll from '../poll/NewPoll';
import Login from './security/Login';
// import Signup from '../user/signup/Signup';
// import NotFound from '../common/NotFound';
import LoadingIndicator from './layout/LoadingIndicator'
import PrivateRoute from './security/PrivateRoute';
import UserGroupFormContainer from './UserGroupFormContainer';
import { Layout, notification } from 'antd';
import SingleUser from './SingleUser';
import UserProvider from './UserProvider';
import Registration from './Registration';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  // Handle Logout, Set currentUser and isAuthenticated state which will be passed to other components
  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
      description: description,
    });
  }

  /* 
   This method is called by the Login component after successful login 
   so that we can load the logged-in user details and set the currentUser &
   isAuthenticated state, which other components will use to render their JSX
  */
  handleLogin() {
    notification.success({
      message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
      description: "Prisijungimas sėkmingas.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <UserProvider isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>      
                {/* <Route exact path="/" 
                  render={(props) => <PollList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route> */}
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                {/* <Route path="/signup" component={Signup}></Route> */}
                <Route path="/user/:email" 
                  render={(props) => <SingleUser isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <Route path="/register" component={Registration}/>
                <Route path="/groups" component={UserGroupFormContainer}/>

                <PrivateRoute authenticated={this.state.isAuthenticated} path="/user/:email" handleLogout={this.handleLogout}> render={(props) => <SingleUser {...props} />}></PrivateRoute>
                {/* <Route component={NotFound}></Route> */}
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);