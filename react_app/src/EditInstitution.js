import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export class EditInstitution extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           title: this.props.match.params.title, //is index.js paima url paima productId
           institution: {},  
           institutions: [],
           redirect: false,        
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("PARAMS TITLE", this.props.match.params.title)
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/institutions/${this.state.title}`)
        .then(result => {
          const institution = result.data
        this.setState({institution});
        console.log(institution)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

     handleChangeFor = (title, city, image, category, type, subtype) => (event) => {
        const { institution } = this.state;
        const newInstitution = {
          ...institution,
          [title]: event.target.value,          
          [city]: event.target.value,
          [image]: event.target.value,
          [category]: event.target.value,
          [type]: event.target.value,
          [subtype]: event.target.value,
        };
        this.setState({ institution: newInstitution });
        console.log("Nauja inst", this.state.institution)
      }
   
    handleSubmit(e) {
        e.preventDefault();
        // const newInstitution = {institution: this.state.institution} ;
       
        axios.put(`http://localhost:8099/api/institutions/${this.state.title}/edit`, {
            title : this.refs.title.value,
            city : this.refs.city.value,
            image : this.refs.image.value,
            category : this.selectCategory.value,
            type : this.selectType.value,
            subtype : this.selectSubtype.value,
        })
        .then(function(response) {
            console.log(response);
            console.log('Send this in a PUT request:',this.refs.title.value );
        }).catch(function (error) {
            console.log(error);
        })

        this.setRedirect();
      }
  render() {

    //  const { institutions } = this.state;
        return (   
          <div className="container">
            <h2>Edit institution</h2>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">Title</label>
              <input type="text" ref="title" onChange={this.handleChangeFor('title')} value={this.state.institution.title} className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">City</label>
              <input type="text" ref="city"  onChange={this.handleChangeFor('city')} value={this.state.institution.city} className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">Image</label>
              <input type="text" ref="image"  onChange={this.handleChangeFor('image')} value={this.state.institution.image} className="form-control" id="inputError1" required/>
            </div>
            <div>
                <label className="control-label">Select category of your institution</label>
                  <select ref={(input) => this.selectCategory = input}  onChange={this.handleChangeFor('category')} value={this.state.institution.category} className="form-control" id="ntype" required>
                    <option value = "">None</option>
                    <option value = "public">Public</option>
                    <option value = "private">Private</option>
                </select>
            </div>
            <div>
                <label className="control-label">Select type of your institution</label>
                  <select ref={(input) => this.selectType = input}  onChange={this.handleChangeFor('type')} value={this.state.institution.type} className="form-control" id="ntype" required>
                    <option value = "">None</option>
                    <option value = "library">Library</option>
                    <option value = "bookstore">Bookstore</option>
                    <option value = "book_archive">Book archive</option>
                    <option value = "book_rental">Book rental</option>
                </select>
            </div>
            <div>
                <label className="control-label">Select subtype of your institution</label>
                  <select ref={(input) => this.selectSubtype = input}  onChange={this.handleChangeFor('subtype')} value={this.state.institution.subtype} className="form-control" id="ntype" required>
                    <option value = "">None</option>
                    <option value = "children">Children</option>
                    <option value = "adults">Adults</option>
                    <option value = "open">Open</option>
                    <option value = "closed">Closed</option>
                </select>
            </div>
                
            {this.renderRedirect()}
              <button className="btn btn-primary" type="submit">Save</button>
            </form>          
          </div>
        ) 
  }
}

export default EditInstitution
