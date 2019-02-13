import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import AddGroup from './AddGroup';


export class SingleDocument extends Component {
  
    constructor(props) {
        super(props)
          
        this.state = {
           number: this.props.match.params.number, 
           email:'user@email.com',
           document: {},
           userDocument:[],
           user:[],
           userFiles:[]  
        }
       
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

    render() {
      return (
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">{this.state.document.title}</h4>
                    <h5>sukurimo data: {this.state.document.createdDate}</h5>
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
                    {this.state.userDocument.map(el=>(String (el.confirmed)) === 'true' ? 'patvirtintas' : 'nepatvirtintas' 
                    )} <br></br>
                    {this.state.userDocument.map(el=>(String (el.rejected)) === 'true' ? 'atmestas' : 'neatmestas' 
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
                {/* <div className="App-intro">
                  <h3>Atsisiųsti visus dokumentus</h3>
                  <button onClick={this.downloadRandomImage}>Download</button>
                  </div> */}
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
