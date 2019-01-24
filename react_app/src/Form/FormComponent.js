import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Form extends Component {
    constructor() {
        super();
        this.state = {
          institutions: [],
          redirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
     
      handleSubmit(e) {
        e.preventDefault();
        const
        { institutions } = this.state,
        title = this.refs.title.value,
        city = this.refs.city.value,
        image = this.refs.image.value,
        category = this.selectCategory.input,
        type = this.selectType.input,
        subtype = this.selectSubtype.input
        this.setState({
          products: [...institutions, {
            title,
            city,
            image,
            category,
            type,
            subtype,
          }]
        },
       
        () => {
          this.refs.title.value = '';
          this.refs.city.value = '';
          this.refs.image.value = '';
          this.selectCategory.input = '';
          this.selectType.input = '';
          this.selectSubtype.input = '';
        });
        this.serverRequest = axios
        .post('http://localhost:8099/api/institutions', {
          title : this.refs.title.value,
          city : this.refs.city.value,
          image : this.refs.image.value,
          category : this.selectCategory.value,
          type : this.selectType.value,
          subtype : this.selectSubtype.value,
        })
        .then(function(response) {
            console.log(response);
            console.log('Send this in a POST request:', institutions);
        }).catch(function (error) {
            console.log(error);
        })

        this.setRedirect();
      }
    
      render() {
       
        return (   
          <div className="container">
            <h2>Add new institution</h2>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">Title</label>
              <input type="text" ref="title" placeholder="Title of your institution" className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">City</label>
              <input type="text" ref="city" placeholder="City of your institution" className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">Image</label>
              <input type="text" ref="image" placeholder="Image name" className="form-control" id="inputError1" required/>
            </div>
            <div>
                <label className="control-label">Select category of your institution</label>
                  <select ref={(input) => this.selectCategory = input} className="form-control" id="ntype" required>
                    <option value = "">None</option>
                    <option value = "public">Public</option>
                    <option value = "private">Private</option>
                </select>
            </div>
            <div>
                <label className="control-label">Select type of your institution</label>
                  <select ref={(input) => this.selectType = input} className="form-control" id="ntype" required>
                    <option value = "">None</option>
                    <option value = "library">Library</option>
                    <option value = "bookstore">Bookstore</option>
                    <option value = "book_archive">Book archive</option>
                    <option value = "book_rental">Book rental</option>
                </select>
            </div>
            <div>
                <label className="control-label">Select subtype of your institution</label>
                  <select ref={(input) => this.selectSubtype = input} className="form-control" id="ntype" required>
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

export default Form;

//updater method
// this.setState(prevState => ({
//     array: [...prevState.array, newElement]
// }))


