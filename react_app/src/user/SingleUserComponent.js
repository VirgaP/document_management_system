import React from 'react';
import { Row, Col } from 'antd';


const SingleUserComponent = (props) => (
    <div className="user-description container">
    <table>
  <tr>
    <th>Vardas:</th>
    <th>Pavardė:</th>
    <th>El. paštas:</th>
    <th>Įgaliojimai:</th>
  </tr>
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.surname}</td>
    <td>{props.user.email}</td>
    <td>{String(props.user.admin) === 'true' ? 'administratorius': 'vartototojas'}</td>
  </tr>
</table> 
</div>
  );
  
  export default SingleUserComponent; 