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
import SingleBook from './SingleBook';
import SingleInstitution from './SingleInstitution';
import InstitutionList from './InstitutionListContainer';
import BookListContainer from './BookListContainer';
import EditInstitution from './EditInstitution';


ReactDOM.render((
    <BrowserRouter>
        <NavbarContainer>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/institutions' component={InstitutionList}/>
                <Route path="/books" component={BookForm}/>
                <Route path="/booksList" component={BookListContainer}/>
                {/* <Route path="/cart/:username" render={(props) => <CartPage {...props} />}/>  */}
                <Route path="/admin" component={Form}/>
                <Route path="/institution/:title" render={(props) => <SingleInstitution {...props} />}/> 
                <Route path="/edit/institution/:title" component={EditInstitution} render={(props) => <EditInstitution {...props} /> }/>   
                <Route path="/register" component={Registration}/>
                <Route path="/book/:title" render={(props) => <SingleBook {...props} />}/>                 
                <Route path="*" component={Nowhere}/>   
            </Switch>
        </NavbarContainer>
    </BrowserRouter>
), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
