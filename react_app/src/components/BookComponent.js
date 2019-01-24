import React from 'react';
import {Link } from "react-router-dom";
import { Button } from 'antd';
import 'antd/dist/antd.css';

    
const bookComponent = (props) => { 
    return(    
    
    <tr>
        <td>{props.title}</td>
        <td>{props.author}</td>
        <td>{props.pageCount}</td>
        <td><img className="card-img-top" src="http://placehold.it/150x150" alt={props.image} height="42" width="42"></img></td>
        <td>
        <Button type="primary">
            <Link to={`/book/${props.title}`}> Show </Link>
        </Button>
    </td>
    </tr>
   
    )
}
export default bookComponent
