import React, { Component } from "react";
import "./Home.css";
import LoginButton from "./LoginButton";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {

    render() {
        let homePage = null;
        if (this.props.isAuthenticatedRedux && this.props.authUser) {
            const userType = this.props.authUser.user;
            homePage = <Redirect to={`${userType}/home`} />
        } else {
            homePage = (
                <div>
                    <h3 id='HomePageHeader' className="LoginHeader">Prisijunkite prie savo paskyros:</h3>
                    <LoginButton />
                </div>
            );
        }

        return (
            <div className="homepage">
                {homePage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticatedRedux: state.auth.accessToken,
        authUser: state.auth.authUser
    }
};

export default connect(mapStateToProps)(Home)
