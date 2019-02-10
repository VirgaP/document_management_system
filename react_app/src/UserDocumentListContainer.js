import React, { Component } from 'react';
import axios from 'axios';
import DocumentListContainer from './DocumentListContainer';
import UserDocument from './UserDocument';


export class UserDocumentListContainer extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      documents:[],
      email: this.props.email,
      error:'',
      userDocuments: [],
      status: null,
    }
    console.log("PROPS", this.props)

  this.fetchData = this.fetchData.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.updateStatus = this.updateStatus.bind(this);
  console.log("Userio dokai", this.state.documents)
}

    fetchData() {
      axios.get(`http://localhost:8099/api/documents/${this.state.email}/documents`)
          // .then(response => {
          //     this.setState({
          //         documents: response.data
          //     }); 
          //     // this.setState({
          //     //   status: response.data.userDocuments.map(el=>(String (el.submitted))) 
          //     // });
              
          // })
          .then(result => {
            const documents = result.data
          this.setState({documents});
          const status = result.data.userDocuments
          console.log('statusas', status)
          this.setState({status})
          
          
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
    updateStatus(number) {
      this.setState(prevState=>{
        const newStatus = prevState.documents.filter((document)=>document.number===!number);
        return {
            status: newStatus
        }
    })
    }
  // componentDidMount = () => {
  //   axios.get(`http://localhost:8099/api/documents/${this.state.email}/documents`)
  //         .then(result => {
  //           const documents = result.data
  //         this.setState({documents});
  //         console.log("Dokumentai", documents)
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  // }
      
  render() {
    
    // console.log("DOCUMENTS",this.state.documents)
    // var DOCUMENTS = this.state.documents;
    // return (
    //   <div>
    //     {(this.state.documents.length === 0 ? <div>Vartotojo dokumentai nerasti</div> :
    //      <DocumentListContainer documents={DOCUMENTS} id={this.state.email}/>
    //     )}
       
    //   </div>
    // )
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
    
    // // this.props.documents.forEach(function(document) {
    //   // rows.push(<Institution document={document}/>);     
    // });
      documents.map((document) => (                                        
          rows.push(<UserDocument current={document} key={document.number} 
            deleteItem={this.deleteItem} updateStatus={this.updateStatus}/>)                    
            ))
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
    
    </div> )
  }
}

export default UserDocumentListContainer

