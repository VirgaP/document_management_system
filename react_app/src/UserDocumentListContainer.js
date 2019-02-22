import React, { Component } from 'react';
import axios from 'axios';
import DocumentListContainer from './DocumentListContainer';
import UserDocument from './UserDocument';


export class UserDocumentListContainer extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      documents:[],
      // email: this.props.email,
      email: this.props.match.params.email,
      error:'',
      userDocuments: [],
      filter:''
    }
    console.log("PROPS", this.props)

  this.fetchData = this.fetchData.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.changeView = this.changeView.bind(this);
  console.log("Userio dokai", this.state.documents)
}

  fetchData() {
      axios.get(`http://localhost:8099/api/documents/${this.state.email}/documents`)
          .then(response => {
              this.setState({
                  documents: response.data
              }); 
          })
          .catch(error => {
              this.setState({
                  error: 'Error while fetching data.'
              });
          });
      }
    componentWillMount() {
      this.fetchData();
  }
  
  deleteItem(number) {
      this.setState(prevState=>{
          const newItems = prevState.documents.filter((document)=>document.number!==number);
          return {
              documents: newItems
          }
      })
    }

    changeView(e) {
      console.log(e)
      this.setState({
        filter: e.target.value,
    });
    Object.keys(this.state.documents).map(el=>el.userDocuments)
      .filter(key => this.state.documents.userDocuments[key].this.state.filter == true)
      
  }
      
  render() {
   
    const { documents, error } = this.state;

    console.log("dokumentai", documents)
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                </div>
            );
        }
    
    var rows = [];
  

    // {Object.keys(this.state.dataGoal)
    //   .filter(key => key.main == true)
    //   .map( (key, index) => {
    //     return <div key={key}>
    //              <h1>{this.state.dataGoal[key].name}</h1>
    //              <p>{this.state.dataGoal[key].main}</p>
    //            </div>
    //   })}

    documents.map((document) => (                                        
          rows.push(<UserDocument current={document} key={document.number} 
            deleteItem={this.deleteItem} />)                    
            ))
    
    return (
      
    <div className="container user_document_list">
   
    <h4>Vartotojo dokumentai</h4>
    <button btn btn-default onClick={this.changeView} value='confirmed'>Patvirtinti</button>
    <table className="table table-striped">
        <thead>
          {/* <tr>
            <th>Pavadinimas</th><th>Aprašymas</th><th>Tipas</th><th>Sukūrimo data</th>
          </tr> */}
        </thead>
        <tbody>{rows}</tbody>
    </table>
    
    </div> )
  }
}

export default UserDocumentListContainer

