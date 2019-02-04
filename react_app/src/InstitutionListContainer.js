import Institution from './Institution';  
import React, { Component } from 'react'

export class InstitutionListContainer extends Component {
      state={
        id:this.props.id
      }
  render() {
    console.log("ILC ", this.props.documents)
    console.log("ID from ILC",this.state.id )

    var rows = [];
    this.props.documents.forEach(function(document) {
      rows.push(<Institution document={document}/>);   
    });
    
    return (

    <div className="container user_document_list">
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th>Aprašymas</th><th>Tipas</th><th>Sukūrimo data</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    
    </div>  
      );

  }
}


export default InstitutionListContainer
