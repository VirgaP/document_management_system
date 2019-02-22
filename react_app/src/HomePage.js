import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon, Badge } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'

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
          console.log("count ", this.state.count)
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
    const {count} = this.state
    return (     
      <div className="container homepage">
        <p>Packed out reflective so dear proud fanciful grasshopper sheep more when a wombat jeepers ouch thanks into as ritually after shrank according exquisitely hedgehog redid thanks wove that impious due one much and below. <br></br> Desolately hamster much bawdy superb where adequate this yet misheard more.
        Cockily bird whimpered less hey in flew this some truculently notwithstanding a mature lizard stuck dog monumentally ambiguous left that iguana outbid much toward genially improper.
        </p>
        <div className="container homepage-link-list">
          <div className="row">
          <div className="col-lg-3 col-md-3" id="hp1"><Link to={`/vartotojas/${this.props.currentUser.email}`}> <Icon type="idcard" /> Vartotojo paskyra</Link></div>
          <div className="col-lg-3 col-md-3" id="hp2"> <Link to={'/naujas-dokumentas'}><Icon type="file-add" /> Kurti naują dokumentą</Link></div>
          <div className="col-lg-3 col-md-3" id="hp3"><Link to={`/siusti/vartotojas/${this.props.currentUser.email}`}><Icon type="folder" /> Sukurti dokumentai</Link></div>
          <div className="col-lg-3 col-md-3" id="hp4"> 
          <Link to={`/gauti/vartotojas/${this.props.currentUser.email}`}><Icon type="inbox" /> Gauti dokumentai</Link> 
          <span class="badge badge-pill badge-primary">5</span>
          </div>
          </div>  
          <button className="btn btn-default" onClick={this.handleDownlaod.bind(this)}>Gauti csv</button> 
        </div>       
      </div>
       
    )
  }
}


export default HomePage
