import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const NavbarContainer = (props) =>{
    return(
        <div>
            <div>
                {/* <Navbar history={props.history}/> */}
                <Navbar/>
            </div>
              {props.children}
              <Footer/>
        </div>
    );
}

export default NavbarContainer;