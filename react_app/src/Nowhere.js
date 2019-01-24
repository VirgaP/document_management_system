import React, {Component} from 'react';

var Nowhere = (props) => {
    var goApp = () => props.history.push("/");
    return (
    <div className="container" style ={style}>
    <div className="row">
        <div className="col-md-12">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, requested page not found!
                </div>
                <div className="error-actions">
                <br/>
                <button className="btn btn-primary" onClick={goApp}>Go home</button>
                </div>
            </div>
        </div>
    </div>
</div>
    )
    
}
const style = {
    height:"500px",
    marginTop: "100px",
    margin:"auto"
}
export default Nowhere;