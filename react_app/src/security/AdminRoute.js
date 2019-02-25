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
              pathname: '/pagrindinis',
            //   state: { from: props.location }
            state: {
                message: alert("my message")
            }
            }}
          />
          
        )
      }
    />
);
  
export default AdminRoute