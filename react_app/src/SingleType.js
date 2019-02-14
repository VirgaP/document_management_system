import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';
import {notification } from 'antd';


export class SingleType extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           title: this.props.match.params.title, //is index.js 
           type: {},
           groups:[],
           groupName:'',
           typeGroups: [],
           send: false,
           receive: false,
        }
        this.handleChangeSend = this.handleChangeSend.bind(this);
        this.handleChangeReceive = this.handleChangeReceive.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/types/${this.state.title}`)
          .then(result => {
            const type = result.data
          this.setState({type});

          const typeGroups = result.data.typeGroups
          this.setState({typeGroups})
          console.log("Tipai", type)
          console.log('typeGroups', typeGroups)
          })
          .catch(function (error) {
            console.log(error);
          });
          axios.get('http://localhost:8099/api/group')
          .then(result => {
            const groups = result.data
          this.setState({groups});
          console.log("Grupes", groups)
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      handleSelectChange(e) {  
        this.setState({ groupName: e.target.value });
      }

      handleChangeSend(event){
        this.setState({ send : event.target.checked });
    
          console.log("Send", this.state.send)
        }

    handleChangeReceive(event){
            this.setState({ receive : event.target.checked });
        
            console.log("Receive", this.state.receive)
        }
        handleClearForm(e) {
            e.preventDefault();
            this.setState({
            groupName: '',
            send: false,
            receive: false
          });
          }

      handleSubmit(e) {
        e.preventDefault();
 
        axios.post(`http://localhost:8099/api/types/${this.state.title}/addGroup`, {
          groupName: this.state.groupName,
          send: this.state.send,
          receive: this.state.receive
            })
            .then(response => {
              console.log("Response", response);
              const responseStatus = response.status
             console.log(responseStatus)
            if(responseStatus >= 200 && responseStatus < 300){ 
              notification.success({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Grupe priskirta'
            });    
             }
          })
          .catch(error => {
            if(error.status >= 400 && error.status == 500) {
                notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: 'Atsiprašome įvyko klaida, bandykite dar kartą!'
                });  
              }})

            this.handleClearForm(e);
      }

    render() {
      const options = this.state.groups.map((group)=> <option key={group.name}>{group.name}</option>)

      return (
  
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    <h5>Pavadinimas: {this.state.type.title}</h5>
                    <div>
                      <h5>Šio tipo dokumentas priskirtas grupėms: </h5> 
                    {(!this.state.typeGroups.length) ? <span>Dokumentas grupei nepriskirtas</span> : <ul>{this.state.typeGroups.map((group) => (<li key={group.group.name}>{group.group.name}</li>))}</ul>}
                    </div>
              </div>
            
            <div className="card-footer">
            <h5>Priskirti vartototjų grupę</h5>
            <form onSubmit={this.handleSubmit}>
            <div>
                <label className="control-label">Pasirinkite vartototjų grupę</label>
                <select value={this.state.groupName} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>
                  <option value="">...</option>
                    {options}
                </select>
            </div>
            <label className="form-label capitalize">
            <input
                type="checkbox"
                checked={this.state.send}
                onChange={this.handleChangeSend}
              /> Siuntėjai
            </label>
            <label className="form-label capitalize">
            <input
                type="checkbox"
                checked={this.state.receive}
                onChange={this.handleChangeReceive}
              /> Gavėjai
            </label>
              <button className="btn btn-primary" type="submit">Saugoti</button>           
            </form>
              </div>
              </div>
            </div>

      );
}
}

const style = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'20px',
    width: '70%'
  }
  const username = {
    border:'solid 1 px grey',
    backgroundColor: 'yellow',
}
export default SingleType
