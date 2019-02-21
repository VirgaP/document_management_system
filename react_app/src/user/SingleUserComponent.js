import React from 'react';


const SingleUserComponent = (props) => (
    <div className="user-description container">
    <div className="row"><pre>Vardas: </pre><p>{props.user.name}</p></div>
    <div className="row"><pre>Pavardė: </pre><p>{props.user.surname}</p></div>
    <div className="row"><pre>El.paštas: </pre><p>{props.user.email}</p></div>
    <div className="row"><pre>Vartotojo įgaliojimai sistemoje: </pre>{String(props.user.admin) === 'true' ? <p>administratorius</p>:<p>vartototojas</p>}</div>

</div>
  );
  
  export default SingleUserComponent; 