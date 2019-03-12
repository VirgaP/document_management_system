import React from 'react';


const UserDocumentCountDisplay = (props) => (
    <div className="user-document-count-display">
    <table class="table table-bordered table-responsive" id="document-count-table">
  <thead>
    <tr>
      <th scope="col">Sukurti</th>
      <th scope="col">Pateikti</th>
      <th scope="col">Patvirtinti</th>
      <th scope="col">Atmesti</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{props.allCount}</td>
      <td>{props.submittedCount}</td>
      <td>{props.confirmedCount}</td>
      <td>{props.rejectedCount}</td>
    </tr>
  </tbody>
</table>

    </div>
  );
  
  export default UserDocumentCountDisplay;