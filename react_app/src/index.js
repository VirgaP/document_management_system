import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import NavbarContainer from './NavbarContainer';
import Nowhere from './Nowhere';
import BookForm from './TypeFormContainer';
import Form from './Form/FormComponent';
import Registration from './Registration';
import HomePage from './HomePage';
import SingleUser from './SingleUser';
import SingleDocument from './SingleDocument';
import InstitutionList from './DocumentListContainer';
import UserGroupFormContainer from './UserGroupFormContainer';
import EditGroup from './EditGroup';
import EditType from './EditType';
import TypeListContainer from './TypeListContainer';
import { UserListContainer } from './UserListContainer';
import { SingleGroup } from './SingleGroup';
import SingleType from './SingleType';
import UserHomePage from './UserHomePage';
import EditDocument from './EditDocument';
import Login from './security/Login';

export const ACCESS_TOKEN = 'accessToken';
export const API_BASE_URL = 'http://localhost:8099'

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;

export const SURNAME_MIN_LENGTH = 3;
export const SURNAME_MAX_LENGTH = 40;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_MAX_LENGTH = 20;


ReactDOM.render((
    <BrowserRouter>
        <NavbarContainer>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path='/institutions' component={InstitutionList}/>
                <Route path="/naujas-tipas" component={BookForm}/>
                <Route path="/groups" component={UserGroupFormContainer}/>
                <Route path="/group/:name" render={(props) => <SingleGroup {...props} />}/>  
                <Route path="/edit/group/:name" component={EditGroup} render={(props) => <EditGroup {...props} /> }/>   
                <Route path="/types" component={TypeListContainer}/>
                <Route path="/type/:title" render={(props) => <SingleType {...props} />}/>                 
                <Route path="/edit/type/:title" component={EditType} render={(props) => <EditType {...props} /> }/>   
                <Route path="/usersList" component={UserListContainer}/>
                <Route path="/user/:email" render={(props) => <SingleUser {...props} />}/>
                {/* <Route path='/user/profile' component={UserHomePage}/> */}
                <Route path="/admin" component={Form}/>
                <Route path="/document/:number" render={(props) => <SingleDocument {...props} />}/> 
                <Route path="/edit/document/:number" component={EditDocument} render={(props) => <EditDocument {...props} /> }/>   
                <Route path="/register" component={Registration}/>
                <Route path="*" component={Nowhere}/>   
            </Switch>
        </NavbarContainer>
    </BrowserRouter>
), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
