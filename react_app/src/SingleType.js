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
           send: '',
           receive: '',
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

          axios.get(`http://localhost:8099/api/types/groups/${this.state.title}`)
            .then(result => {
            const typeGroups = result.data.typeGroups
            this.setState({typeGroups})
            console.log('typeGroups', typeGroups)
            })
            .catch(function (error) {
              console.log(error);
            });
      }

    handleSelectChange(e) {  
        this.setState({ groupName: e.target.value });
      }

    handleChangeSend(event){
      console.log('select send', event.target.value)
        this.setState({ send : event.target.value });
    
    }

    handleChangeReceive(event){
      console.log('select receive', event.target.value)
            this.setState({ receive : event.target.value });

    }

    handleResultChange(value, receive, send) {

      const newGroup = {
        group: {
          name : value
        },
        receive: receive,
        send: send
      }
      var newArray = this.state.typeGroups.slice();       
      newArray.push(newGroup);   
      console.log("NEW ARRAY", newArray)
      this.setState({typeGroups:[...newArray]})
    }
    
    handleClearForm(e) {
            e.preventDefault();
            this.setState({
            groupName: '',
            send: '',
            receive: ''
          });
    }

    handleRemove(index) {
      let typeGroups = this.state.typeGroups
       let groupIdx = this.state.typeGroups.findIndex((group) => group.name === index); //find array elem index by name/index
      console.log("Index", groupIdx)
        const newList = this.state.typeGroups.splice(groupIdx, 1); //delets element and returns removed element
       this.setState({ typeGroups: [...typeGroups] }); 

       axios.delete(`http://localhost:8099/api/types/${this.state.title}/${index}/remove`)
          .then(response => {
            console.log("Response", response);
            const responseStatus = response.status
          console.log(responseStatus)
          if(responseStatus >= 200 && responseStatus < 300){ 
            notification.success({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: 'Dokumento tipo grupė sėkmingai pašalinta!'
          });    
          }
        })
         .catch(function (error) {
             console.log(error);
             notification.error({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: error.message || 'Atsiprašome įvyko klaida, bandykite dar kartą!'
          }); 
         }); 
     }
    handleSubmit(e) {
        e.preventDefault();
      
        var existing = this.state.groupName
        existing.toString()
      
        for (var i = 0, len = this.state.typeGroups.length; i < len; i ++) {
          if(this.state.typeGroups[i].group.name.indexOf(existing) !== -1){ 
          notification.error({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Tipas jau priskirtais šiai grupei'
          })
          return;
            }
          }
        
        axios.post(`http://localhost:8099/api/types/${this.state.title}/addGroup`, {
          groupName: this.state.groupName,
          send: this.state.send,
          receive: this.state.receive,
            })
            .then(response => {
              console.log("Response", response);
              const responseStatus = response.status
             console.log(responseStatus)
            if(responseStatus >= 200 && responseStatus < 300){ 
              notification.success({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Grupė priskirta'
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
            this.handleResultChange(this.state.groupName, this.state.receive, this.state.send)
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
                    {(this.state.typeGroups.length == 0) ? <span>Dokumentas grupei nepriskirtas</span> : 
                    <ul>{this.state.typeGroups.map((element) => 
                       
                       (<li key={element.group.name}>{element.group.name} - 
                       {element.receive.toString() === 'true' ? 'Gavėjai' : 'negali gauti' } - 
                       {element.send.toString() === 'true' ? 'Siuntėjai' : 'negali siųsti' }
                       &nbsp;<button className="btn-default" 
                  onClick={this.handleRemove.bind(this, element.group.name)}
                  >x</button>
                      </li>))}</ul>}
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
          
            <div>
                <label className="control-label">Pasirinkite vartototjų grupės dokumentų gavimo tipą</label>
                <select onChange={this.handleChangeReceive} 
                className="form-control" id="ntype" required>
                  <option value="">...</option>
                  <option value="true">Gali gauti</option>
                  <option value="false">Negali gauti</option>
                </select>
            </div>
            <div>
                <label className="control-label">Pasirinkite vartototjų grupės dokumentų siuntimo tipą</label>
                <select onChange={this.handleChangeSend} 
                className="form-control" id="ntype" required>
                  <option value="">...</option>
                  <option value="true">Gali siųsti</option>
                  <option value="false">Negali siųsti</option>
                </select>
            </div>
            
            {/* <label className="form-label capitalize">
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
            </label> */}
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
