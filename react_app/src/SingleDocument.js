import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddGroup from './AddGroup';
import {Link} from 'react-router-dom'
import {notification, Icon } from 'antd';
import SingleDocumentComponent from './document/SingleDocumentComponent';
import FileDownloadContainer from './FileDownloadContainer';


export class SingleDocument extends Component {
  
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
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

      handleResultChange(value) {
        var fileName = value;
        var newFile ={fileName}
        var newArray = this.state.userFiles.slice();       
        newArray.push(newFile);   
        console.log("NEW ARRAY", newArray)
        this.setState({userFiles:[...newArray]})

      }

      handleSubmit(e){
        e.preventDefault();
      
      this.fileUpload(this.state.file).then((response)=>{
          console.log(response.data)
        })
      axios.post(`http://localhost:8099/api/documents/${this.state.number}/file`, {
        fileName: this.state.file.name
          })
          .then(response => {
              console.log("Response", response);
              const responseStatus = response.status
             console.log(responseStatus)
             if(responseStatus >= 200 && responseStatus < 300){ 
              notification.success({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Dokumentas pateiktas sėkmingai!'
            });    
            this.handleResultChange(this.state.fileName)
            }
          })
          .catch(error => {
            if(error.status === 500) {
                notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: 'Atsiprašome įvyko klaida įkeliant dokumentą, perkraukite puslapį ir bandykite dar kartą!'
                });                    
            } else {
                notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: error.message || 'Atsiprašome įvyko klaida, bandykite dar kartą!'
                });                                            
            }
        });
       
      }

    SubmitDocument(number) {
        var email = this.state.user.map(el=>el.email)
        email = email.toString();
        
        axios.put(`http://localhost:8099/api/documents/${number}/${email}/submit`)
        .then(response => {
          console.log("Response", response);
          const responseStatus = response.status
         console.log(responseStatus)
        if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumentas pateiktas!'
        }); 
        this.props.history.push('/pagrindinis')   
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

      onChange(e) {
        this.setState({file:e.target.files[0]})

        switch (e.target.name) {
          // Updated this
          case 'selectedFile':
            if(e.target.files.length > 0) {
                // Accessed .name from file 
                this.setState({ fileName: e.target.files[0].name });
            }
          break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      fileUpload(file){
        const url = 'http://localhost:8099/api/file/uploadFile';
        const formData = new FormData();
        formData.append('file',file)
        // formData.append('fileName', this.state.date + this.state.file.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  axios.post(url, formData,config)
      }

    render() {
      const {fileName} = this.state
      const user = this.state.user.map(el=>el.email);
      const current = this.props.currentUser.email;
      console.log("useriai ", user + current)
      let selected = null;
      selected = fileName 
      ? ( <span>Pasirinkta - {fileName}</span>) 
      : ( <span>Pasirinkite dokumentą...</span> );

      return (
        <div className="container" id="document">
           <div className="container single-document">
           <SingleDocumentComponent document={this.state.document} userDocument={this.state.userDocument} user={this.state.user}/>
           <FileDownloadContainer userFiles={this.state.userFiles}/>
              
            <div className="file-upload">
              {this.state.userDocument.map(el=>(String (el.submitted)) !== 'true'  ? 
            <div>
              <h5>Pateikti papildomus dokumentus</h5>
             <form classsName="form-row" onSubmit={this.handleSubmit}>
                <div className="custom-file col-lg-10 col-md-10" id="customFile" lang="es">
                <input type="file" className="custom-file-input" name="selectedFile" id="exampleInputFile" aria-describedby="fileHelp" onChange={this.onChange} required/>
                <label className="custom-file-label" htmlFor="file">{selected}</label>
                </div>
                <button className="btn btn-primary col-lg-2 col-md-2" type="submit">Pridėti failą</button>
              </form>
              </div> : <span></span> 
                    )} <br></br>

                </div>
                {/* user !== current */}
                {  this.state.userDocument.map(el=>(String (el.submitted)) === 'true') ?  <span></span> : //dokumenta pateikti gali tik jo sukurejas
                    <Button type="primary"  block onClick={() => this.SubmitDocument(this.state.document.number)}>Pateikti dokumentą</Button> 
                }
                <Button type="primary"  block onClick={() => this.SubmitDocument(this.state.document.number)}>Pateikti dokumentą</Button>
                <br></br> 
                  <span id="back-to-list">
                  <Link to={`/siusti/vartotojas/${current}`}><Icon type="left-circle-o" /> Grįžti į dokumentų sąrašą</Link> 
                  </span>   
                </div>
                </div>
      );
    }
}

export default SingleDocument
