import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import UserProvider from './UserProvider';
import UserContext from './UserContext';

export class SingleType extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           title: this.props.match.params.title, //is index.js 
           type: {},
           groups:[],
           groupName:'',
           send: false,
           receive: false,
        }

        this.handleChangeSend = this.handleChangeSend.bind(this);
        this.handleChangeReceive = this.handleChangeReceive.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);

        console.log("id", this.state.title);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/types/${this.state.title}`)
          .then(result => {
            const type = result.data
          this.setState({type});
        //   const groupUsers = result.data.groupUsers
        //   this.setState({groupUsers})
          console.log("Tipai", type)
        //   console.log('Useriai', groupUsers)
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
  
      DeleteItem = (event) => {
          axios.delete(`http://localhost:8099/api/types/${this.state.title}`)
          .then(result => {
            const type = result.data
          this.setState({type});
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.props.history.push('/') //redirects Home after delete
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
            .then(function(response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })

            this.handleClearForm(e);
      }

      
  
    render() {
      return (
          <UserProvider>
          <UserContext.Consumer>
             {(context)=> (  
              <React.Fragment>  
          <div style={username}>You are now logged in as : {context}</div>
  
           <div className="container" style={style}>
           <div className="card h-100">
              <div className="card-body">
                    <h4 className="card-title">
                    </h4>
                    <h5>Pavadinimas: {this.state.type.title}</h5>
                   
                    {/* <div>
                      <h5>Grupės vartotojai: </h5> 
                    {(!this.state.groupUsers.length) ? <span>Grupei vartotojai neprisikirti</span> : <ul>{this.state.groupUsers.map((user) => (<li key={user.email}>{user.name}</li>))}</ul>}
                    </div> */}
              </div>
            
            <div className="card-footer">
            <h5>Priskirti varototjų grupę</h5>
            <form onSubmit={this.handleSubmit}>
            <div>
                <label className="control-label">Pasirinkite varototjų grupę</label>
                <select value={this.state.groupName} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>{this.state.groups.map((group)=> <option key={group.name}>{group.name}</option>)}</select>
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
          
                <Button type="danger" onClick={this.DeleteItem.bind(this)}>Trinti</Button>

              </div>
            </div>
  
              </React.Fragment> 
                  )}
              </UserContext.Consumer>
              </UserProvider>
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
