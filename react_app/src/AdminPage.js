import React, { Component } from 'react'
import axios from 'axios';
import DocumentListContainer from './DocumentListContainer';
import GroupListContainer from './GroupListContainer';
import TypeListContainer from './TypeListContainer';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'


export class AdminPage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      documents:[],
      groups:[],
      types:[],
      displayDocuments: true,
      displayGroups: true,
      displayTypes: true

      
    }
     
  }
  fetchData() {
    axios.get('http://localhost:8099/api/documents')
        .then(response => {
            this.setState({
                documents: response.data
            });
        })
        .catch(error => {
            this.setState({
                error: 'Error while fetching data.'
            });
        });
    }

  componentDidMount = () => {

          axios.get('http://localhost:8099/api/group')
          .then(result => {
            const groups = result.data
          this.setState({groups});
          console.log("Grupes", groups)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get('http://localhost:8099/api/types')
          .then(result => {
            const types = result.data
          this.setState({types});
          console.log("Tipai", types)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  toggleDocuments () {
    this.setState({
      displayDocuments: !this.state.displayDocuments
    })
  }

  toggleGroups () {
    this.setState({
      displayGroups: !this.state.displayGroups
    })
  }

  toggleTypes () {
    this.setState({
      displayTypes: !this.state.displayTypes
    })
  }

  render() {
    var DOCUMENTS = this.state.documents;
    var GROUPS = this.state.groups;
    var TYPES = this.state.types;
    return (
     
      <div className="container-fluid admin_page">
      <div className="row">
      <Button size="large" type="primary" onClick={this.toggleDocuments.bind(this)} >
        Peržiūrėti vartotojų dokumentus
      </Button>
      {!this.state.displayDocuments && <DocumentListContainer documents={DOCUMENTS}/>}
      <br></br>
      <Button size="large" type="primary" onClick={this.toggleGroups.bind(this)} >
        Peržiūrėti vartotojų grupes
      </Button>
      {!this.state.displayGroups && <GroupListContainer groups={GROUPS}/>}
      <br></br>
      <Button size="large" type="primary" onClick={this.toggleTypes.bind(this)} >
        Peržiūrėti dokumentų tipus
      </Button>
      {!this.state.displayTypes && <TypeListContainer types={TYPES}/>}
      <br></br>
    </div>
  <div class="card-columns">
  <div class="card bg-light">
    <div class="card-body text-center">
      <p class="card-text"><Link to={'/naujas-tipas'}> Kurti dokumento tipą</Link></p>
    </div>
  </div>
  <div class="card bg-light">
    <div class="card-body text-center">
      <p class="card-text"> <Link to='/nauja-grupe'>Kurti vartotojų grupę </Link></p>
    </div>
  </div>
  <div class="card bg-light">
    <div class="card-body text-center">
      <p class="card-text"><Link to='/vartotojai'>Peržiūrėti sukurtus vartotojus </Link></p>
    </div>
  </div>
  <div class="card bg-light">
    <div class="card-body text-center">
      <p class="card-text"><Link to='/naujas-vartotojas'>Kurti naują vartotoją</Link></p>
    </div>
  </div> 
</div>
    </div>
    )
  }
}

export default AdminPage
