import Institution from './Institution';  
import React, { Component } from 'react'

export class InstitutionListContainer extends Component {
      
  render() {
    console.log(this.props.documents)

    var rows = [];
    this.props.documents.forEach(function(document) {
      rows.push(<Institution document={document} />);   
    });
    
    return (

    <div className="container">
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th>Aprašymas</th><th>Tipas</th><th>Sukūrimo data</th><th>peržiūra</th><th>pateikti</th><th>trinti</th><th>redaguoti</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    
    </div>  
      );

  }
}


export default InstitutionListContainer
