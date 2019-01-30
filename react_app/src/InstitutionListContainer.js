import Institution from './Institution';  
import React, { Component } from 'react'

export class InstitutionListContainer extends Component {
      
  render() {
    console.log(this.props.documents)
    // const result = this.props.documents.filter(document => document.type === "library");
    // console.log("REsult", result)
    var rows = [];
    this.props.documents.forEach(function(document) {
      rows.push(<Institution document={document} />);   
    });
    
    return (

    <div className="container">
   {/* {rows.length < 2 
   ? ( <div class="alert alert-danger" role="alert">Total of {rows.length} is registered. Need to regsiter at least 2</div> ) 
   :   null 
   }
   { result.length == 0
   ? ( <div class="alert alert-warning" role="alert">At least one library must be added</div> ) 
   : null
   } */}
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>City</th><th>Catgeory</th><th>Type</th><th>Subtype</th><th>view</th><th>delete</th><th>edit</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    
    </div>  
      );

  }
}


export default InstitutionListContainer
