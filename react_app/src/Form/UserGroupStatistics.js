import React, { Component } from 'react'
import axios from 'axios';
import { Input, Button, Icon, Radio, DatePicker, Select } from 'antd';
import moment from 'moment';

const Search = Input.Search;
const RadioGroup = Radio.Group;

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const Option = Select.Option;
export class UserGroupStatistics extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          result: '',
          startDate:{},
          endDate:{},
          typeTitle: null,
          documentTypes:[],
          userGroups:[],
          email: this.props.currentUser.email,
          groupName:null,
          startDateString:'',
          endDateString:'',
          radioValue:'',
          status:''
        }; 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchSubmittedCount = this.fetchSubmittedCount.bind(this);
        this.resetSearch  = this.resetSearch.bind(this);
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8099/api/users/${this.state.email}`)
        .then(result => {
            console.log("grupe", result)

        const userGroups = result.data.userGroups
        this.setState({userGroups})
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(`http://localhost:8099/api/types/${this.state.email}/userReceivedDocumentTypes`)
        .then(result => {
          console.log("tipas", result)
          
         const tipai = result.data;
         var documentTypes = [];
         tipai.forEach(element => {
           documentTypes.push(element.title);
         });

         this.setState({ 
           documentTypes
         })
       })
       .catch(function (error) {
           console.log(error);
         }); 
      
    }
    
    handleDateRange = (date, dateString) => {
        console.log("dates ", date, dateString)
        console.log(dateString[0])
    
        let myStartDate = new Date(dateString[0]);
        let myEndDate = new Date (dateString[1])

        this.setState({
            startDate: myStartDate,
            endDate: myEndDate,
            startDateString: dateString[0],
            endDateString: dateString[1]
        })
    }   

    fetchSubmittedCount(){
        axios.get(`http://localhost:8099/api/documents/${this.state.email}/${this.state.startDate}/${this.state.endDate}/${this.state.typeTitle}/${this.state.groupName}`)
        .then(result => {
        
        this.setState({result: result.data, status:"pateikti(-as)"});
        console.log("RESULT", result.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    handleTypeSelectChange(value) {  
        console.log("selected ", value)
        this.setState({ typeTitle: value });
    }

    handleGroupSelectChange(value) {  
        console.log("selected ", value)
        this.setState({ groupName: value });
    }

     onRadioChange = (e) => {
            console.log('radio checked', e.target.value);
            this.setState({
              radioValue: e.target.value,
            });
        }

    handleSubmit(){
        if(this.state.radioValue === "submitted") {
            this.fetchSubmittedCount()
        }else {
            return null
        }
       
    }

    resetSearch(e){
        
        this.setState({ 
            typeTitle: null,
            groupName: null,
            startDate: {},
            endDate:{},
            result: '',
            startDateString:'',
            endDateString:'',
            radioValue:'',
            status:''
        });
    }

  render() {
    
    console.log("group in state ", this.state.groupName)
    console.log("start date in state ", this.state.startDate)
    console.log("end date in state ", this.state.endDate)
    console.log("radio in state ", this.state.radioValue)
    return (
        <section>
        <div className="container" id="statistics-search-form">
                <span id="btn-statistics">
               <Button  type="primary" icon="search" onClick={this.handleSubmit}>Pateikti užklausą</Button>
               <Button  onClick={this.resetSearch}>Išvalyti duomenis</Button>
               </span>
               <h5>Gautų dokumentų statistika</h5>          
        <div className="container">
        <div className="row">
            <br></br><br></br> 
            <div className="col-lg-4 col-sm-12">     
            <span id="date-range-search">
            <RangePicker
            style={{  width: '100%' }}
            defaultValue={[moment('2019/03/01', dateFormat), moment('2019/03/31', dateFormat)]}
            format={dateFormat}
            onChange={(date, dateString)=>this.handleDateRange(date, dateString)}
            allowClear = {true}
            />
            </span>  
            </div>
            <div className="col-lg-4 col-sm-12">
                <Select        
                style={{ width: '100%' }}
                placeholder="Pasirinkite grupę"
                onChange={value=>this.handleGroupSelectChange(value)} 
                required>
                    {this.state.userGroups.map((group) => (
                    <Select.Option key={group.name} value={group.name}>{group.name}</Select.Option>
                    ))}
                </Select>
            </div>
            <div className="col-lg-4 col-sm-12">
                <Select        
                style={{ width: '100%' }}
                placeholder="Pasirinkite dokumento tipą"
                onChange={value=>this.handleTypeSelectChange(value)} 
                onFocus={this.handleFocus}
                required>
                    {this.state.documentTypes.map((type) => (
                    <Select.Option key={type} value={type}>{type}</Select.Option>
                    ))}
                </Select>
            </div>
        </div>
        <span>
            <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
            <Radio value={"submitted"}>Pateiktas</Radio>
            <Radio value={"confirmed"}>Patvirtintas</Radio>  
            <Radio value={"rejected"}>Atmestas</Radio> 
            </RadioGroup>
        </span>
      </div>
      </div>
      {this.state.result &&
      <div className="container" id="statistics-search-result">
        <p>Per užklausos laikotarpį nuo {this.state.startDateString} iki {this.state.startDateString} grupei {this.state.groupName.toUpperCase()} {this.state.status} {[this.state.result]} dokumentų tipo {this.state.typeTitle.toUpperCase()} dokumentai(-as)</p>
      </div>
      }
      </section>

    )
  }
}

export default UserGroupStatistics
