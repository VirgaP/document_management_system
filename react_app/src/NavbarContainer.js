import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const NavbarContainer = (props) =>{
    return(
        <div>
            <div>
                {/* <Navbar history={props.history}/> */}
                <Navbar/>

                <div>List of institutions from navbarContainer</div>
                <div>List of booksfrom navbarContainer</div>
            </div>
              {props.children}
              <Footer/>
        </div>
    );
}

export default NavbarContainer;