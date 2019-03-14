import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon, Badge } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import ZipDownload from './ZipDownload';
import InstructionsAdmin from './layout/InstructionsAdmin';
import UserDocumentTable from './UserDocumentTable';
import UserDocumentCountDisplay from './user/UserDocumentCountDisplay';
import UserSearch from './Form/UserSearch';


export class HomePage extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          email:this.props.currentUser.email,
          user:{},
          currentUser: ' ',
          documentsReceived:[],
          count:0,
          allCount: 0,
          submittedCount: 0,
          confirmedCount: 0,
          rejectedCount:0,
          documents:[]
        }; 
        
        const user = props.currentUser;
          console.log("props", user) 
          console.log("COUNT ", this.props.count)
    }
   
      componentDidMount = () => { 
        axios.get(`http://localhost:8099/api/users/${this.state.email}/test/info`)
            .then(response => {
              console.log("response", response)
                this.setState({
                    allCount: response.data[0],
                    submittedCount: response.data[1],
                    confirmedCount: response.data[2],
                    rejectedCount: response.data[3]
                });
                console.log("all count ", this.state.allCount)
                console.log("subimmted ", this.state.submittedCount)
                console.log("confirmed ", this.state.confirmedCount)
                console.log("rejected ", this.state.rejectedCount)
              
            })
            .catch(error => {
                this.setState({
                    error: 'Error while fetching data.'
                });
            });
        
          
         axios.get(`http://localhost:8099/api/users/${this.state.email}`)
          .then(result => {
          const user = result.data
          this.setState({user});
          console.log("USERIS", user)
          })
          .catch(function (error) {
            console.log(error);
          });

        

      //   axios.get('http://localhost:8099/api/documents/documentsSpecCount/prasymas')
      //   .then(result => {
       
      //  console.log(result)
         
      //   })
      //   .catch(error => {
      //     this.setState({
      //         error: 'Error while fetching data.',
      //         isLoading: false
      //     });
      //   });
      }

      handleDownlaod = (index, filename) => {
    
        axios(`http://localhost:8099/api/users/${this.state.email}/download/documentsCsv`, {
          method: 'GET',
          responseType: 'blob' 
      })
      .then(response => {
        console.log("Response", response.data);
        if(response.data.type === 'text/csv'){
          const file = new Blob(
            [response.data], 
            {type: 'text/csv'},
          );
          const fileURL = URL.createObjectURL(file);
          //download file      
            let a = document.createElement('a');
            a.href = fileURL;
            a.download = filename;
            a.click();
        } 
            })
        .catch(error => {
                console.log(error);
          }); 
        }
      
  render() {
    
    return ( 
      <div className="container homepage">
      <div><h4>Sveiki, {this.state.user.name + ' ' + this.state.user.surname}, prisijungę prie Abrakadabra dokumentų valdymo sistemos.</h4></div>
      <br></br>
      <UserSearch/>
      <br></br>
      <UserDocumentCountDisplay allCount={this.state.allCount} submittedCount={this.state.submittedCount} 
      confirmedCount={this.state.confirmedCount} rejectedCount={this.state.rejectedCount}/>      
      {this.state.user.admin && <InstructionsAdmin/>}
        <div className="container homepage-link-list">
          {/* <div className="row">
          <div className="col-lg-3 col-md-3" id="hp1"><Link to={`/vartotojas/${this.props.currentUser.email}`}> <Icon type="idcard" /> Vartotojo paskyra</Link></div>
          <div className="col-lg-3 col-md-3" id="hp2"> <Link to={'/naujas-dokumentas'}><Icon type="file-add" /> Kurti naują dokumentą</Link></div>
          <div className="col-lg-3 col-md-3" id="hp3"><Link to={`/siusti/vartotojas/${this.props.currentUser.email}`}><Icon type="folder" /> Sukurti dokumentai</Link></div>
          <div className="col-lg-3 col-md-3" id="hp4"> 
          <Badge count={this.state.count} showZero>
          <Link to={{
            pathname: `/gauti/vartotojas/${this.props.currentUser.email}`,
            state: { 
              documentsReceived: this.state.documentsReceived,
              count: this.state.count
            }
          }}>Gauti</Link>&nbsp;&nbsp;&nbsp;  
            <a href="#" className="head-example" />
          </Badge>
          
          {/* <span className="badge badge-pill badge-primary">{this.state.count}</span> */}
          {/* </div>
          </div>  */} 
          <div className="row">
          <ZipDownload email={this.state.email} />
          <button className="btn btn-default" onClick={this.handleDownlaod.bind(this)}>Gauti csv</button> 
          </div>
        </div>       
      </div>   
    )
  }
}


export default HomePage
