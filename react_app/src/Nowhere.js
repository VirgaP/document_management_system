import React, {Component} from 'react';
import {Link} from 'react-router-dom'


var Nowhere = (props) => {
    var goApp = () => props.history.push("/");
    return (
        <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>404</h1>
			</div>
			<h2>We are sorry, Page not found!</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<Link to={'/pagrindinis'}>Back To Homepage</Link>
		</div>
	</div>
    )
    
}

export default Nowhere;