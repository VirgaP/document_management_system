import React from 'react';
import axios from 'axios';


class ReceivedUserDocuments extends React.Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
          documentsReceived:[],
          email: this.props.email
        }
    
      this.fetchData = this.fetchData.bind(this);
    
      console.log("Userio dokai", this.state.documentTypes)
    }
    
      fetchData() {
        axios.get(`http://localhost:8099/api/documents/${this.state.email}/received`)
        .then(result => {
         const gauti = result.data;
         console.log("GAUTI ", result.data)
         var documentsReceived = [];
         gauti.forEach(element => {
            documentsReceived.push(element.title);
         });

         this.setState({ 
            documentsReceived
         })
         console.log("DOKU TIPAI", documentsReceived)
     
       })
       .catch(function (error) {
           console.log(error);
         }); 
    }

    componentWillMount() {
          this.fetchData();
      }
      render() {
          return (
              <div>gauti dokai</div>
          )
      }
  }
 
export default ReceivedUserDocuments;