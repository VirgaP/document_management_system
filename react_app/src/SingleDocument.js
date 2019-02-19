import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddGroup from './AddGroup';
import {notification } from 'antd';


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
        console.log(document.userDocument)
        console.log("User", user)
        console.log("Failai", userFiles)
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
        
        axios.patch(`http://localhost:8099/api/documents/${number}/${email}/submit`)
        .then(response => {
          console.log("Response", response);
          const responseStatus = response.status
         console.log(responseStatus)
        if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumentas pateiktas!'
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

    handleDownlaod = (index, filename) => {
    
      axios(`http://localhost:8099/api/files/downloadFile/${index}`, {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    .then(response => {
      console.log("Response", response.data);
      if(response.data.type === 'application/pdf'){
        //Create a Blob from the PDF Stream
        const file = new Blob(
          [response.data], 
          {type: 'application/pdf'},
        );
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //download file      
          let a = document.createElement('a');
          a.href = fileURL;
          a.download = filename;
          a.click();
      } if(response.data.type === 'image/png'){ //dowload png format
        const file = new Blob(
          [response.data], 
          {type: 'image/png'} 
        );
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //download file      
          let a = document.createElement('a');
          a.href = fileURL;
          a.download = filename;
          a.click();
      }
      if(response.data.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){ //dowload png format
        const file = new Blob(
          [response.data], 
          {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'} 
        );
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //download file      
          let a = document.createElement('a');
          a.href = fileURL;
          a.download = filename;
          a.click();
      }
          //alternatevly open the URL in new Window
              // window.open(fileURL);
          })
          .catch(error => {
              console.log(error);
          });
          
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
        const url = 'http://localhost:8099/api/files/uploadFile';
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
      let selected = null;
      selected = fileName 
      ? ( <span>Pasirinkta - {fileName}</span>) 
      : ( <span>Pasirinkite dokumentą...</span> );

      return (
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">{this.state.document.title}</h4>
                    <h5>Sukūrimo data: {this.state.document.createdDate}</h5>
                    <h5>Dokumento nr.: {this.state.document.number}</h5>
                    <h5>Dokumento tipas: {(this.state.document.type !=null) ? this.state.document.type.title : 'tipas nepriskirtas'}</h5>
                    <h5>Vartotojas: {this.state.user.map(el=>el.name + ' ' + el.surname)}</h5>
                    <h5>Vartotojo el.paštas: {this.state.user.map(el=>el.email)}</h5>

                    <h5>Dokumento būsena: 
                      <br></br>
                    {this.state.userDocument.map(el=>(String (el.saved)) === 'true' ? 'sukurtas' : 'neišsaugotas' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.submitted)) === 'true' ? 'pateiktas' : 'nepateiktas' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.confirmed)) === 'true' ? 'patvirtintas' : '' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.rejected)) === 'true' ? 'atmestas' : '' 
                    )}  
                     </h5>
              </div>
              </div>
              <div className="card-footer">
              <p>{this.state.document.description}</p>
              <div>
                  <h5>Pateikti dokumentai </h5> 
                      {(this.state.userFiles.length === 0) ? <span>Pateiktų dokumentų nėra</span> : 
                    <ul>{this.state.userFiles.map((file) => (<li key={file.id}>{file.fileName} 
                      <button onClick={this.handleDownlaod.bind(this, file.id, file.fileName )}>Download</button></li>))}</ul>}
              </div>
              
              {this.state.userDocument.map(el=>(String (el.submitted)) !== 'true' ? 
            <div>
              <h5>Pateikti papildomus dokumentus</h5>
             <form onSubmit={this.handleSubmit}>
                <div className="custom-file" id="customFile" lang="es">
                <input type="file" className="custom-file-input" name="selectedFile" id="exampleInputFile" aria-describedby="fileHelp" onChange={this.onChange} required/>
                <label className="custom-file-label" htmlFor="file">{selected}</label>
                </div><br></br>
                <button className="btn btn-primary" type="submit">Pridėti failą</button>
              </form>
              </div> : <span></span> 
                    )} <br></br>
                    <Button type="primary" onClick={() => this.SubmitDocument(this.state.document.number)}>Pateikti dokumentą</Button>
                </div>
            </div>
      );
    }
}

const style = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'10%',
    width: '70%'
  }
  const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}

export default SingleDocument
