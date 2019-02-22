import React from 'react';
import axios from 'axios';
import ReceivedDocument from './ReceivedDocument';
import { Button, notification, Icon } from 'antd';
import {Link} from 'react-router-dom'
import LoadingIndicator from './layout/LoadingIndicator';


class ReceivedUserDocuments extends React.Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
          documentsReceived:[],
          email: this.props.match.params.email,
          error: '',
          count: '',
          isLoading: false,
        }
        console.log("from Link ", this.props.location.state)
      this.fetchData = this.fetchData.bind(this);
    }
    
      fetchData() {
        this.setState({
          isLoading: true
        });
        axios.get(`http://localhost:8099/api/documents/${this.state.email}/received`)
        .then(result => {
       
        const documentsReceived = result.data;
         this.setState({ 
            documentsReceived,
            isLoading: false,
         })
         this.setState({count:documentsReceived.length})
         const count = documentsReceived.length
         this.setState({
           count:count
         })
         console.log("COUNT", this.state.count)
         console.log("Gauti dokumentai", documentsReceived)
        })
        .catch(error => {
          this.setState({
              error: 'Error while fetching data.',
              isLoading: false
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
    
        if(this.state.isLoading) {
          return <LoadingIndicator />
        }
        var rows = [];
  
        documentsReceived.map((document) => (                                        
              rows.push(<ReceivedDocument current={document} key={document.number} 
                deleteItem={this.deleteItem} email={this.state.email} />)                    
                ))
        return (
        <div className="container user_document_list">
        <h3>Gauti dokumentai</h3>
        {this.state.isLoading ? <LoadingIndicator /> : 
        <table className="table table-striped">
            <thead>
             
            </thead>
            {documentsReceived.length === 0 ? 
            <tbody>Nėra gautų dokumentų.</tbody>:
            <tbody>{rows}</tbody>}
        </table>
        }
        </div> )
      }
  }
 
export default ReceivedUserDocuments;