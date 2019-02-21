import React from 'react';
import axios from 'axios';
import ReceivedDocument from './ReceivedDocument';
import { Button, notification } from 'antd';


class ReceivedUserDocuments extends React.Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
          documentsReceived:[],
          // email: this.props.email,
          email: this.props.match.params.email,
          // email:this.props.currentUser.email,
          error: ''
        }
    
        console.log("EMAIL" ,this.state.email)
        console.log("PROPS", this.props.email)
      this.fetchData = this.fetchData.bind(this);
    
      console.log("Userio dokai", this.state.documentTypes)
    }
    
      fetchData() {
        axios.get(`http://localhost:8099/api/documents/${this.state.email}/received`)
        .then(result => {
       
        //  var documentsReceived = [];
        //  gauti.forEach(element => {
        //     documentsReceived.push(element.title);
        //  });
        const documentsReceived = result.data;
        console.log("GAUTI ", result.data)
         this.setState({ 
            documentsReceived
         })
         console.log("Gauti dokumentai", documentsReceived)
     
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
          const newItems = prevState.documentsReceived.filter((document)=>document.number!==number);
          return {
            documentsReceived: newItems
          }
      })
    }  
    
      render() {

        const { error, documentsReceived } = this.state;
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                </div>
            );
        }
    
        var rows = [];
  
        documentsReceived.map((document) => (                                        
              rows.push(<ReceivedDocument current={document} key={document.number} 
                deleteItem={this.deleteItem} email={this.state.email} />)                    
                ))
        return (
        <div className="container user_document_list">
        <table className="table table-striped">
            <thead>
              <tr>
                <h3>Gauti dokumentai</h3>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        
        </div> )
      }
  }
 
export default ReceivedUserDocuments;