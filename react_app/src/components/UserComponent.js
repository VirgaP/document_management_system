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
        <Link to={`/vartotojas/${props.email}`}>
        <Button type="primary">
<<<<<<< HEAD
         Peržiūrėti 
=======
            Peržiūrėti 
>>>>>>> 88bd95fa98b790ceef353a0d6c7bbc7ec56e26ae
        </Button>
        </Link>
    </td>
    </tr>
   
    )
}
export default userComponent
