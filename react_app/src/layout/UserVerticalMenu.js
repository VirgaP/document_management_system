import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button, Icon, Badge } from 'antd';
import axios from 'axios';


export class UserVerticalMenu extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          email:this.props.currentUser.email,
          user:{},
          currentUser: ' ',
          documentsReceived:[],
          count:0
        }; 
        
        const user = props.currentUser;

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
       })
       .catch(error => {
         this.setState({
             error: 'Error while fetching data.',
             isLoading: false
         });
       });
     }
  render() {
    return (
      <div>
       <nav class="navigation">
  <ul class="mainmenu">
    <li><Link to={`/vartotojas/${this.props.currentUser.email}`}> <Icon style={{ fontSize: '26px', color: '#08c' }} theme="outlined" type="idcard" /> </Link></li>
    <li><a href="">Dokumentai</a>
      <ul class="submenu">
        <li><a href="">Visi</a></li>
        <li><a href="">Pateikti</a></li>
        <li><a href="">Patvirtinti</a></li>
        <li><a href="">Atmesti</a></li>
      </ul>
    </li>
    <li><a href="">Kurti dokumenta</a></li>
    <li><Badge count={this.state.count} showZero>
          <Link to={{
            pathname: `/gauti/vartotojas/${this.props.currentUser.email}`,
            state: { 
              documentsReceived: this.state.documentsReceived,
              count: this.state.count
            }
          }}>Gauti</Link>&nbsp; 
            <a href="#" className="head-example" />
          </Badge></li>

  </ul>
</nav> 
      </div>
    )
  }
}

export default UserVerticalMenu
