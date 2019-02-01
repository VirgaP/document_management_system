import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import NavbarContainer from './NavbarContainer';
import Nowhere from './Nowhere';
import BookForm from './BookFormContainer';
import Form from './Form/FormComponent';
import Registration from './Registration';
import HomePage from './HomePage';
import SingleUser from './SingleUser';
import SingleInstitution from './SingleInstitution';
import InstitutionList from './InstitutionListContainer';
import EditInstitution from './EditInstitution';
import UserGroupFormContainer from './UserGroupFormContainer';
import EditGroup from './EditGroup';
import EditType from './EditType';
import TypeListContainer from './TypeListContainer';
import { UserListContainer } from './UserListContainer';


ReactDOM.render((
    <BrowserRouter>
        <NavbarContainer>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/institutions' component={InstitutionList}/>
                <Route path="/books" component={BookForm}/>
                <Route path="/groups" component={UserGroupFormContainer}/>
                <Route path="/edit/group/:name" component={EditGroup} render={(props) => <EditGroup {...props} /> }/>   
                <Route path="/types" component={TypeListContainer}/>
                <Route path="/edit/type/:title" component={EditType} render={(props) => <EditType {...props} /> }/>   
                <Route path="/usersList" component={UserListContainer}/>
                <Route path="/user/:email" render={(props) => <SingleUser {...props} />}/>                 
                <Route path="/admin" component={Form}/>
                <Route path="/institution/:number" render={(props) => <SingleInstitution {...props} />}/> 
                <Route path="/edit/institution/:number" component={EditInstitution} render={(props) => <EditInstitution {...props} /> }/>   
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
