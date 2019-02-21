import React, { Component } from 'react';
import axios from 'axios';

export class FileDownloadContainer extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        file:null,
        fileName: '', 
        // userFiles: props.userFiles 
         
      }
      console.log('userfiles', this.props.userFiles)
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
      } if(response.data.type === 'image/png'){ 
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
      if(response.data.type === 'image/jpeg'){ 
        const file = new Blob(
          [response.data], 
          {type: 'image/jpeg'} 
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
      
        <div className="document-files">
            <div className="attachements">
                <h5>Pateikti dokumentai </h5> 
                {(this.props.userFiles.length === 0) ? <span>Pateiktų dokumentų nėra</span> : 
                <ul>{this.props.userFiles.map((file) => (<li key={file.id}>{file.fileName}&nbsp;&nbsp; 
                <button onClick={this.handleDownlaod.bind(this, file.id, file.fileName )}>Atsisiųsti</button></li>))}</ul>}
            </div>
        </div>
    )
  }
}

export default FileDownloadContainer
