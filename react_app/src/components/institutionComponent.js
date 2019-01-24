import React from 'react';
import {Link } from "react-router-dom";
import { Button } from 'antd';
import 'antd/dist/antd.css';

    
const InstitutionComponent = (props) => { 
    console.log("PROPSAI", props)
    return(    
    <tbody>
    <tr>
        <td>{props.title}</td>
        <td>{props.city}</td>
        <td>{props.category}</td>
        <td>{props.type}</td>
        <td>{props.subType}</td>
        <td><img className="card-img-top" src="http://placehold.it/150x150" alt={props.image} height="42" width="42"></img></td>
        <td>
        <Button type="primary">
            <Link to={`/institution/${props.title}`}> See more details </Link>
        </Button>
    </td>
    </tr>
    </tbody>
    )
}
export default InstitutionComponent
