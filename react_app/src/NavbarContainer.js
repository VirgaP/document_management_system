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
import './index.css';
// import PollList from '../poll/PollList';
// import NewPoll from '../poll/NewPoll';
import Login from './security/Login';
// import Signup from '../user/signup/Signup';
// import NotFound from '../common/NotFound';
import TypeForm from './TypeFormContainer';
import DocumentList, { DocumentListContainer } from './DocumentListContainer';
import LoadingIndicator from './layout/LoadingIndicator'
import PrivateRoute from './security/PrivateRoute';
import UserGroupFormContainer from './UserGroupFormContainer';
import { Layout, notification } from 'antd';
import SingleUser from './SingleUser';
import UserProvider from './UserProvider';
import Registration from './Registration';
import HomePage from './HomePage';
import SingleGroup from './SingleGroup';
import Navbar from './Navbar'
import EditGroup from './EditGroup';
import SingleType from './SingleType';
import EditType from './EditType';
import UserListContainer from './UserListContainer'
import Form from './Form/FormComponent';
import EditDocument from './EditDocument';
import SingleDocument from './SingleDocument';
import UserHomePage from './UserHomePage';
import Nowhere from './Nowhere';
import Footer from './Footer';
import UserContext from './UserContext';
import UserDocumentListContainer from './UserDocumentListContainer';
import { AuthProvider } from './context/AuthContext';
import SingleReceivedDocument from './SingleReceivedDocument';
import ReceivedUserDocuments from './ReceivedUserDocuments';
import GroupListContainer from './GroupListContainer';
import TypeListContainer from './TypeListContainer';
// import ReceivedUserDocuments from './ReceivedUserDocuments'

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
        console.log("User reposne", response)
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
        console.log("Error in getuser", error)
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  // Handle Logout, Set currentUser and isAuthenticated state which will be passed to other components
  handleLogout(redirectTo="/", notificationType="success", description="Atsijungimas sėkmingas.") {
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
    this.props.history.push("/pagrindinis");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
            {(this.state.isAuthenticated) ?
        <Navbar isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} /> :
            <span></span>}   
          <Content className="app-content">
            <div className="container">
          
              <Switch>  
              {/* <AuthProvider>     */}
              <Route exact path="/" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
              <Route exact path='/pagrindinis'
                  render={(props) => <HomePage isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <Route path='/dokumentai' component={DocumentList}/>
                {/* <Route path="/naujas-dokumentas" component={Form}/> */}
                <Route path="/naujas-dokumentas" render={(props) => <Form currentUser={this.state.currentUser} {...props} />}/>
                <Route path="/dokumentas/:number" render={(props) => <SingleDocument currentUser={this.state.currentUser} {...props} />}/> 
                <Route path="/gautas/dokumentas/:number" render={(props) => <SingleReceivedDocument currentUser={this.state.currentUser} {...props} />}/> 
                <Route path="/redaguoti/dokumentas/:number" component={EditDocument} render={(props) => <EditDocument {...props} /> }/>
                <Route path="/mano-dokumentai" render={(props) => <UserDocumentListContainer currentUser={this.state.currentUser} {...props} />}/>
                <Route path="/naujas-tipas" component={TypeForm}/>
                <Route path='/visi-tipai' component={TypeListContainer}/>
                <Route path="/tipas/:title" render={(props) => <SingleType {...props} />}/>                 
                <Route path="/redaguoti/tipas/:title" component={EditType} render={(props) => <EditType {...props} /> }/>   
                <Route path="/vartotojas/:email" render={(props) => <SingleUser currentUser={this.state.currentUser} {...props} />}/>
                <Route path='/gauti/vartotojas/:email/' render={(props) => <ReceivedUserDocuments currentUser={this.state.currentUser} {...props} />}/>
                <Route path='/siusti/vartotojas/:email/' render={(props) => <UserDocumentListContainer currentUser={this.state.currentUser} {...props} />}/>
                <Route path='/visi-dokumentai' component={DocumentListContainer}/>
                <Route path="/naujas-vartotojas" component={Registration}/>
                <Route path="/nauja-grupe" component={UserGroupFormContainer}/>
                <Route path='/visos-grupes' component={GroupListContainer}/>
                <Route path="/grupe/:name" render={(props) => <SingleGroup {...props} />}/> 
                <Route path="/redaguoti/grupe/:name" component={EditGroup} render={(props) => <EditGroup {...props} /> }/> 
                <Route path="/vartotojai" component={UserListContainer}/>
                {/* <PrivateRoute authenticated={this.state.isAuthenticated} path="/vartotojas/:email" handleLogout={this.handleLogout}> render={(props) => <SingleUser {...props} />}></PrivateRoute> */}
                <Route path="/vartotojas/:email" render={(props) => <SingleUser currentUser={this.state.currentUser} {...props} />}/>
                {/* <Route path="/vartotojas/gauti" render={(props) => <ReceivedUserDocuments currentUser={this.state.currentUser} {...props} />}/> */}
                <Route path="*" component={Nowhere}/>  
                {/* </AuthProvider> */}
              </Switch>
              </div>
          </Content>
          {/* <Footer/> */}
        </Layout>
    );
  }
}

export default withRouter(App);