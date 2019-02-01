import React from 'react';
import {Link } from "react-router-dom";
import { Button } from 'antd';
import 'antd/dist/antd.css';

    
const userComponent = (props) => { 
    return(    
    
    <tr>
        <td>{props.name}</td>
        <td>{props.surname}</td>
        <td>{props.email}</td>
        {/* <td>{props.type}</td> */}
        <td>
        <Button type="primary">
            <Link to={`/user/${props.email}`}> Peržiūrėti </Link>
        </Button>
    </td>
    </tr>
   
    )
}
export default userComponent
