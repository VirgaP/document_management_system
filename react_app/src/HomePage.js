import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import ReceivedUserDocuments from './ReceivedUserDocuments';
import SingleUser from './SingleUser';

export class HomePage extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          email:this.props.currentUser.email,
          user:{},
          currentUser: ' ',
        
        }; 
        const user = props.currentUser;
          console.log("props", user) 
    }
          
      componentDidMount = () => {   
         axios.get(`http://localhost:8099/api/users/${this.state.email}`)
          .then(result => {
          const user = result.data
          this.setState({user});
          console.log("USERIS", user)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      handleDownlaod = (index, filename) => {
    
        axios(`http://localhost:8099/api/users/${this.state.email}/download/csv`, {
          method: 'GET',
          responseType: 'blob' //Force to receive data in a Blob Format
      })
      .then(response => {
        console.log("Response", response.data);
        if(response.data.type === 'text/csv'){
          //Create a Blob from the PDF Stream
          const file = new Blob(
            [response.data], 
            {type: 'text/csv'},
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
    // const {
    //     currentUser: { 
    //       email 
    //     }
    //   } = this.props;

    //   console.log("Email", email)
    return (
      
      <div className="container homepage">
        <p>Packed out reflective so dear proud fanciful grasshopper sheep more when a wombat jeepers ouch thanks into as ritually after shrank according exquisitely hedgehog redid thanks wove that impious due one much and below. <br></br> Desolately hamster much bawdy superb where adequate this yet misheard more.
        Cockily bird whimpered less hey in flew this some truculently notwithstanding a mature lizard stuck dog monumentally ambiguous left that iguana outbid much toward genially improper.
        </p>
        <div className="container homepage-link-list">
          <div className="row">
          <span id="hp1"><Link to={`/vartotojas/${this.props.currentUser.email}`}> <Icon type="idcard" /> Vartotojo paskyra</Link></span>
          <span id="hp2"> <Link to={'/naujas-dokumentas'}><Icon type="file-add" /> Kurti naują dokumentą</Link></span>
          <span id="hp3"><Link to={`/siusti/vartotojas/${this.props.currentUser.email}`}><Icon type="folder" /> Sukurti dokumentai</Link></span>
          <span id="hp4"><Link to={`/gauti/vartotojas/${this.props.currentUser.email}`}><Icon type="inbox" /> Gauti dokumentai</Link> </span>
          <button className="btn btn-default" onClick={this.handleDownlaod.bind(this)}>Gauti csv</button>
          </div>   
        </div>       
      </div>
       
    )
  }
}


export default HomePage
