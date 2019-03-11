import React from 'react';
import {Card, Row, Col} from 'antd';


const SingleDocumentComponent = (props) => (
  
   
    <Card className="document-description" id="document-card" title={props.document.title} bordered={false}>
      <Row className="reject-message">
      {props.userDocument.map(el=>el.rejected &&
      <p>{el.message}</p>
      )}
      </Row>
      <Row>
        <Col span={12}>
          <p>{props.document.createdDate}</p>
          <pre>Sukūrimo data</pre>
          </Col>
          <Col span={12}>      
          <p>{props.document.submittedDate ? props.document.submittedDate : "..."}</p>
          <pre>Pateikimo data</pre>
        </Col>
     </Row>
     <Row>
        <Col span={12}>
          <p>{props.document.number}</p>
          <pre>Unikalus dokumento numeris</pre>
          </Col>
          <Col span={12}>     
          <p>{(props.document.type !=null) ? props.document.type.title : 'Tipas nepriskirtas'}</p>
          <pre>Dokumento tipas</pre>
          </Col>
     </Row>
     <Row>
        <Col span={12}>
          <p>{props.document.description}</p>
          <pre>Dokumento aprašymas</pre>
        </Col>
    <Col span={12}>
          <p>{props.userDocument.map(el=>el.submitted ? 'Pateiktas': 'Nepateiktas')}&nbsp;{props.userDocument.map(el=>el.confirmed && <span>Patvirtintas</span> || 
          el.rejected && <span>Atmestas</span>)}</p>
          {/* <p>{props.userDocument.map(el=>el.confirmed && <span>Patvirtintas</span> || 
          el.rejected && <span>Atmestas</span> 
          )}</p> */}
          <pre>Dokumento būsena</pre>
        </Col>
     </Row>
     <Row>
        <Col span={12}>
          <p>{props.user.map(el=>el.name + ' ' + el.surname)}</p>
          <pre>Vartotojas (vardas, pavardė)</pre>
          </Col>
          <Col span={12}>
          <p>{props.user.map(el=>el.email)}</p>
          <pre>Vartotojo el.paštas: </pre>
        </Col>
       </Row>
      </Card>
    //   <div className="status">
    // <h5>Dokumento būsena: </h5>
    // <div className="row">
    //   <br></br>
    // {props.userDocument.map(el=>(String (el.saved)) === 'true' && <span className="document-status" id="saved">Sukurtas</span>
    // )} <br></br> 
    // { props.userDocument.map(el=>(String (el.submitted)) === 'true' && <span className="document-status" id="submitted">Pateiktas</span>  
    // // : <span className="document-status" id="notsubmitted">Nepateiktas</span>
    // )} <br></br> 
    // {props.userDocument.map(el=>(String (el.confirmed)) === 'true' && <span className="document-status" id="confirmed">Patvirtintas</span> 
    // // : <span className="document-status" id="not-confirmed">Nepatvirtintas</span>  
    // )} <br></br> 
    // {props.userDocument.map(el=>(String (el.rejected)) === 'true' && <span className="document-status" id="rejected">Atmestas</span> 
    // )} 

    //  </div>
    //  </div>
  );
  
  export default SingleDocumentComponent;  