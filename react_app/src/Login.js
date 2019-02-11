import React, {Component} from 'react';
import NavbarContainer from './NavbarContainer';



export default class LoginForm extends Component{
render(){


    return(
        <div className="app-login-form">
        
        <div className="app-login-form-inner">
       
            <h2 className="form-title">Prisijunkite</h2>
            <form>
                    <div className="app-form-item">
                    <label htmlFor="email-id">El. paštas:</label>
                    <input placeholder="El. paštas" id= "email-id" type="email" name="email"></input>
                    </div>
                    <div className="app-form-item">
                    <label htmlFor="password-id">Slaptažodis :</label>
                    <input placeHolder="Slaptažodis" id= "password-id" type="password" name="password"></input>
                    </div>
                    <div className="app-form-actions">
                    <button className="app-button primary">Prisijunkite</button></div>
                
            </form>

        </div>
        
        
        </div>

    )
}



}