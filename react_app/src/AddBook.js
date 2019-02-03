import React, { Component } from 'react';
import axios from 'axios';

export class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            groupName:'',
            institutionBooks: [],
            institutionBook: {},
            id:this.props.id,
          };
          console.log("URL",this.state.id)
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleSelectChange = this.handleSelectChange.bind(this);
        }  

    componentDidMount = () => {
        axios.get('http://localhost:8099/api/group')
        .then(result => {
            const groups = result.data;
            console.log(groups);
          this.setState({ 
            groups
          })
      })
          .catch(function (error) {
              console.log(error);
            }); 
    }
    
    handleSelectChange(e) {  
        this.setState({ groupName: e.target.value });
      }

    handleSubmit(e) {
        e.preventDefault();

        const payload = {
            groupName: this.state.groupName,
        }
    console.log("Payload  ", payload)
       axios.post(`http://localhost:8099/api/users/${this.state.id}/addGroup`,  payload)
       .then(res => console.log("Send POST request", payload));
        
       this.setState({
            groupName:''
        })
        this.props.onResultChange(payload)
      }

  render() {
    const options = this.state.groups.map((group)=> <option key={group.name}>{group.name}</option>)
console.log("Groupname", this.state.groupName)
    return (
      <div>
        <h4>Pridėti vartotojo grupę</h4>
            <form onSubmit={this.handleSubmit}>
            <div>
            <label className="control-label">Pasirinkite vartotojo grupę</label>
                <select value={this.state.groupName} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>
                  <option value="">...</option>
                    {options}
                </select>
            </div>
            <button className="btn btn-primary" type="submit">Pridėti</button>
            <br/>
            </form>
      </div>
    )
  }
}

export default AddBook
