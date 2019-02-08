import React, {Component} from "react";
import "./Login.css";
import LoginForm from "../../components/Form/Forms/LoginForm";
import * as actions from '../../store/actions/authentication'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import jwtDecode from "jwt-decode";

class Login extends Component {

    componentWillMount() {
        this.props.onAuthInit()
    }

    handleSubmit = values => {
        const email = values.email;
        const password = values.password;
        this.props.onAuth(email, password);
    };

    render() {

        let errorMessage = null;
        if (this.props.errorRedux) {
            errorMessage = <span>{this.props.errorRedux}</span>
        }
        let loginForm = <LoginForm onSubmit={this.handleSubmit}>{errorMessage}</LoginForm>;

        if (this.props.loadingRedux) {
            loginForm = <Spinner/>
        }

        let authRedirect = null;
        if (this.props.isAuthenticatedRedux) {
            const token = this.props.isAuthenticatedRedux;
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.authorities;
            if (roles.includes('ROLE_ADMIN')) {
                authRedirect = <Redirect to='/admin/home'/>
            }
            else if (roles.includes('ROLE_USER')) {
                authRedirect = <Redirect to='/user/home'/>
            }

        }

        return (
            <div id='loginPage' className="Login">
                {authRedirect}
                {loginForm}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loadingRedux: state.auth.loading,
        errorRedux: state.auth.error,
        isAuthenticatedRedux: state.auth.accessToken
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onAuthInit: () => dispatch(actions.authInit())
    }
};

// errorHandler wraps Login class to catch errors
export default connect(mapStateToProps, mapDispatchToProps)(Login);
