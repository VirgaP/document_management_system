import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SingleInput from '../components/singleInput';


class Form extends Component {
    constructor() {
        super();
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+'-'+today.getHours()+'-'+today.getMinutes();
        this.state = {
          documents: [],
          redirect: false,
          types: [],
          typeTitle: '',
          title: '',
          description: '',
          email:'jonas@email.com',
          date: date,
          uniqueNumber:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleDocumentTitleChange = this.handleDocumentTitleChange.bind(this);
        this.handleDocumentDescriptionChange = this.handleDocumentDescriptionChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
      }
      // setRedirect = () => {
      //   this.setState({
      //     redirect: true
      //   })
      // }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
      componentDidMount = () => {
        axios.get('http://localhost:8099/api/types')
        .then(result => {
            const types = result.data;
            console.log(types);
          this.setState({ 
            types
          })
      })
          .catch(function (error) {
              console.log(error);
            }); 

        //     const uniqueNumber = this.state.date + '-' + this.state.email;
        //     console.log("Num not in state", uniqueNumber)
        //     this.setState({uniqueNumber})
        // console.log(this.state.date)
        // // this.setState({documentNo: this.state.date + '' + this.state.email})
        // console.log("Dok num", this.state.uniqueNumber)
    }


  handleDocumentTitleChange(e) {  
    this.setState({ title: e.target.value });
  }

  handleDocumentDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleSelectChange(e) {  
    this.setState({ typeTitle: e.target.value });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    title: '',
    description: '',
    typeTitle: ''
  });
  }
      handleSubmit(e) {
        e.preventDefault();

        const uniqueNumber = this.state.date + '-' + this.state.email;

        console.log("Tipas ", this.state.typeTitle);
        console.log('Pavadinimas ', this.state.title);
        console.log('Aprasymas ', this.state.description)
        console.log('Email ', this.state.email)
        console.log('Number', uniqueNumber)

        this.handleClearForm(e);
 
        axios.post('http://localhost:8099/api/documents/new', {
          title: this.state.title,
          description: this.state.description,
          typeTitle: this.state.typeTitle,
          email:this.state.email,
          uniqueNumber: uniqueNumber
            })
            .then(function(response) {
              console.log("Tipas post", this.state.typeTitle);
              console.log('Pavadinimas post ', this.state.title);
              console.log('Aprasymas post', this.state.description)
              console.log('Email post', this.state.email)
              console.log('Number', uniqueNumber)

                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })

        // this.setRedirect();
      }
    
      render() {
       
        return (   
          <div className="container">
            <h2>Sukurti naują dokumentą</h2>
            <form onSubmit={this.handleSubmit}>
            <SingleInput 
              inputType={'text'}
              title={'Dokumento pavadinimas'}
              name={'title'}
              controlFunc={this.handleDocumentTitleChange}
              content={this.state.title}
              placeholder={'Dokumento pavadinimas'}
             /> 

            <SingleInput 
              inputType={'text'}
              title={'Dokumento aprasymas'}
              name={'description'}
              controlFunc={this.handleDocumentDescriptionChange}
              content={this.state.description}
              placeholder={'Dokumento aprasymas'}
             /> 
            
            <div>
                <label className="control-label">Pasirinkite dokumento tipą</label>
                <select value={this.state.typeTitle} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>{this.state.types.map((type)=> <option key={type.title}>{type.title}</option>)}</select>
            </div>
                
            {this.renderRedirect()}
              <button className="btn btn-primary" type="submit">Saugoti dokumentą</button>
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


