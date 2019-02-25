import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Type from './Type';

export class TypeListContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      types: [],
    }

    console.log("props Types", this.props)
  this.deleteType = this.deleteType.bind(this);
}

componentDidMount = () => {
  axios.get('http://localhost:8099/api/types')
  .then(result => {
    const types = result.data
  this.setState({types});
  console.log("Tipai", types)
  })
  .catch(function (error) {
    console.log(error);
  });
}


  deleteType(title) {
   
    this.setState(prevState=>{
        const newItems = prevState.types.filter((type)=>type.title!==title);
        return {
            types: newItems
        }
    })
  }

  render() {
  
    var rows = [];
    this.state.types.map((type) => (
      rows.push(<Type type={type} key={type.title} deleteType={this.deleteType}/>)  
    ));
    
    return (

    <div className="container item-list">
    <h4>Dokumento tipai</h4>
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th>peržiūra</th><th>trinti</th><th>redaguoti</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    
    </div>  
      );

  }
}


export default TypeListContainer
