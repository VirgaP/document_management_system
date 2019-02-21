import React, { Component } from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';
import SingleDocumentComponent from './document/SingleDocumentComponent';
import FileDownloadContainer from './FileDownloadContainer';

export class SingleReceivedDocument extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        number: this.props.match.params.number, 
        //  email:'user@email.com',
         document: {},
         userDocument:[],
         user:[],
         userFiles:[],
         file:null,
         fileName: '',  
      }
      this.handleConfirm = this.handleConfirm.bind(this)
      this.handleReject = this.handleReject.bind(this)
    }
    componentDidMount = () => {
        axios.get(`http://localhost:8099/api/documents/${this.state.number}`)
        .then(result => {
        const document = result.data
        this.setState({document});
        console.log("Document", document)

        const user= []
        document.userDocuments.forEach(element => {
          if(element.document.id === element.primaryKey.document.id){
            user.push(element.user)
          }
        });

        const userFiles = []
        document.dbFiles.forEach(element=>{
            userFiles.push(element) 
        });

        const userDocument = [];
        document.userDocuments.forEach(element => {
          if(element.document.id === element.primaryKey.document.id){
            userDocument.push(element)
          }
        });
        
        this.setState({user});
        this.setState({userFiles})
        this.setState({userDocument})
        })
        .catch(function (error) {
          console.log(error);
        });

      }

      handleConfirm(number) {
        var email = this.state.user.map(el=>el.email)
        email = email.toString();
        
        axios.put(`http://localhost:8099/api/documents/${number}/${email}/confirm`)
        .then(response => {
          console.log("Response", response);
          const responseStatus = response.status
         console.log(responseStatus)
        if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumentas patvirtintas!'
        }); 
        this.props.history.push(`/vartotojas/${email}`)   
         }
      })
      .catch(error => {
        if(error.status >= 400 && error.status == 500) {
            notification.error({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Atsiprašome įvyko klaida, bandykite dar kartą!'
            });  
          }})
  
    }
    handleReject(number) {
        var email = this.state.user.map(el=>el.email)
        email = email.toString();
        
        axios.put(`http://localhost:8099/api/documents/${number}/${email}/reject`)
        .then(response => {
          console.log("Response", response);
          const responseStatus = response.status
         console.log(responseStatus)
        if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumentas atmestas!'
        }); 
        this.props.history.push(`/vartotojas/${email}`)   
         }
      })
      .catch(error => {
        if(error.status >= 400 && error.status == 500) {
            notification.error({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Atsiprašome įvyko klaida, bandykite dar kartą!'
            });  
          }})
  
    }

    
  render() {
    return (
        <div className="container single-document">
        <SingleDocumentComponent document={this.state.document} userDocument={this.state.userDocument} user={this.state.user}/>
        <FileDownloadContainer userFiles={this.state.userFiles}/>
             {/* user !== current */}
             {/* {  this.state.userDocument.map(el=>(String (el.submitted)) === 'true') ?  <span></span> : //dokumenta pateikti gali tik jo sukurejas
                 <Button type="primary"  block onClick={() => this.SubmitDocument(this.state.document.number)}>Pateikti dokumentą</Button> 
             } */}

        <div className="row no-gutters">    
            <div className="col-lg-6 col-md-6">
                <Button type="primary"  block onClick={() => this.handleConfirm(this.state.document.number)}>Patvirtinti dokumentą</Button> 
            </div>
            <div className="col-lg-6 col-md-6">
                <Button type="danger"  block onClick={() => this.handleReject(this.state.document.number)}>Atmesti dokumentą</Button> 
            </div>
        </div>
    </div>
    )
  }
}

export default SingleReceivedDocument
