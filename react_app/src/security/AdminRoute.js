import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
  
const AdminRoute = ({ component: Component, isAuthenticated, isAdmin, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && isAdmin ? (
          <Component {...rest} {...props} />
        ) : (
            
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            // state: {
            //     message: "my message"
            // }
            }}
          />
          
        )
      }
    />
);
  
export default AdminRoute