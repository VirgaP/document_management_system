import React from 'react';


const SingleDocumentComponent = (props) => (
    <div className="document-description container">
    <h4>{props.document.title}</h4>
    <div className="row reject-message">
    {props.userDocument.map(el=>el.rejected &&
    <p>{el.message}</p>
    )}
    </div>
    <div className="row"><pre>Sukūrimo data: </pre><p>{props.document.createdDate}</p></div>
    {props.document.submittedDate &&<div className="row"><pre>Pateikimo data: </pre><p>{props.document.submittedDate}</p></div>}    
    <div className="row"><pre>Unikalus dokumento nr.: </pre><p>{props.document.number}</p></div>
    <div className="row"><pre>Dokumento tipas: </pre><p>{(props.document.type !=null) ? props.document.type.title : 'tipas nepriskirtas'}</p></div>
    <div className="row"><pre>Dokumento aprašymas: </pre><p>{props.document.description}</p></div>
    <hr></hr>
    <div className="row"><pre>Vartotojas: </pre><p>{props.user.map(el=>el.name + ' ' + el.surname)}</p></div>
    <div className="row"><pre>Vartotojo el.paštas: </pre><p>{props.user.map(el=>el.email)}</p></div>
   
  <div className="status">
    <h5>Dokumento būsena: </h5>
    <div className="row">
      <br></br>
    {props.userDocument.map(el=>(String (el.saved)) === 'true' ? <span className="document-status" id="saved">Sukurtas</span> : 'neišsaugotas' 
    )} <br></br>
    {props.userDocument.map(el=>(String (el.submitted)) === 'true' ? <span className="document-status" id="submitted">Pateiktas</span>  : <span className="document-status" id="notsubmitted">Nepateiktas</span>
    )} <br></br>
    {props.userDocument.map(el=>(String (el.confirmed)) === 'true' ? <span className="document-status" id="confirmed">Patvirtintas</span> : <span className="document-status" id="not-confirmed">Nepatvirtintas</span>  
    )} <br></br>
    {props.userDocument.map(el=>(String (el.rejected)) === 'true' ? <span className="document-status" id="rejected">Atmestas</span> : '' 
    )}  
     </div>
     </div>
</div>
  );
  
  export default SingleDocumentComponent;  