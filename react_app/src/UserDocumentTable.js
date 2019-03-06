import Institution from './Institution';  
import React, { Component } from 'react';
import axios from 'axios';
import DocumentListPagination from './DocumentListPagination';
import AntPagination from './AntPagination';
import { Table, Tag, Input, Button, Icon, notification, Form, Select, Option, Menu } from 'antd';
import {Link } from "react-router-dom";
import reqwest from 'reqwest';


export class UserDocumentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id:this.props,
        email: this.props.match.params.email,
        documents: [],
        data: [],
        pagination: {},
        loading: false,
        page:'',
        filterDropdownVisible: false,
        searchText: '',
        filteredInfo: null,
        heading: "Visi sukurti dokumentai" || '',
        url: `http://localhost:8099/api/documents/${this.props.match.params.email}/all`
        }
        // const baseUrl = `http://localhost:8099/api/documents/${this.props.match.params.email}`; 
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }

    componentDidMount() {
        this.fetch() 
    }

   
    componentDidUpdate(prevProps, prevState) {
        console.log("prevState", prevState.url)

        if (prevState.url!== this.state.url) {
            this.fetch();
        }
        console.log(this.state.url)
    }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
          filterDropdownVisible: false,
          data: this.state.data.map((record) => {
            const match = record.type.title.match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record,
              name: (
                <span>
                  {record.type.title.split(reg).map((text, i) => (
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                  ))}
                </span>
              ),
            };
          }).filter(record => !!record),
        });
      }

    handleTableChange = (pagination, filters, sorter, value) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          page: this.state.page, 
          filteredInfo: filters,
          searchText: value  
        });
        
        const desc = (sorter.order == "descend" ? "desc" : "asc");
        this.fetch({
         results: pagination.pageSize,
         page: pagination.current,
         sort: "created_Date" + decodeURIComponent("%2c")+desc,
         sortOrder: decodeURIComponent("%2c")+desc,
          ...filters,
        });
        console.log("filter ", filters)

      }
    
      fetch = (params = {}) => {
          const {page}=this.state
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
        //   url: `http://localhost:8099/api/documents/${this.state.email}/all`,
          url: this.state.url,  
          method: 'get',
          data: {
            size: 10,
            sort: 'created_Date,desc',
            ...params,
          },
          type: 'json',
        }).then((data) => {
        console.log("data resp ", data)
          const pagination = { ...this.state.pagination };
          // Read total count from server
          pagination.total = data.totalElements;
          this.setState({
            loading: false,
            data: data.content,
            page: data.number,
            pagination,
          });
        });
      }
    

      deleteDocument(number){
        alert("Ar tikrai norite ištrinti šį dokumentą?")
        axios.delete(`http://localhost:8099/api/documents/${number}`)
        .then(result => {
            this.setState(prevState=>{
                const newItems = prevState.data.filter((document)=>document.number!==number);
                    return {
                    data: newItems
                    }})
        const responseStatus = result.status
        console.log(result)
        if(responseStatus >= 200 && responseStatus < 300){ 
            notification.success({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: 'Dokumentas sukurtas sėkmingai!'
            });    
           }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    handleFilter=(value , event)=>{
        this.setState({
            url: value
        })
    }
    
  render() {

    let { filteredInfo, searchText } = this.state;
    filteredInfo = filteredInfo || {};
    searchText = searchText || {};

    const columns = [{
        title: 'Pavadinimas',
        dataIndex: 'title',
        // sorter: true,
        render: title => title,
        width: '20%',
      },{
        title: 'Numeris',
        dataIndex: 'number',
        render: number =><Link to={`/dokumentas/${number}`}>{number}</Link>,
        width: '20%',
      },{
        title: 'Tipas',
        dataIndex: 'type',
        render: type => type.title,
        filterDropdown: (
            <div className="custom-filter-dropdown">
              <Input
                placeholder="Įveskite dokumento tipo pavadinimą"
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSearch}
              />
              <Button type="primary" onClick={this.onSearch}>Ieškoti</Button>
            </div>
          ),
          filterDropdownVisible: this.state.filterDropdownVisible,
          onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
        width: '20%',
      }, {
        title: 'Data',
        dataIndex: 'createdDate',
        key: 'created_Date',
        sorter: true,
        defaultSortOrder: 'desc',
        render: createdDate => createdDate,
        width: '20%',
      },
    //   {
    //     title: 'Būsena',
    //     dataIndex: 'userDocuments',
    //     key: 'status',
    //     render: userDocuments => userDocuments.map(item => {
    //         var sub = item.submitted === true ? 'pateiktas' : <span id="notsub">nepateiktas</span>
    //         let con = item.confirmed === true ? <span id="con">patvirtintas</span> : <span id="notcon">nepatvirtintas</span>
    //         let tags = [sub, con]
    //         return <span key={item.document.id} id="tags">{tags.map(tag =>
    //         <Tag color="blue" key={tag}>{tag}</Tag>)}
    //         </span>
    //     }),
    //     width: '15%',
    //   },
      {
        title: '',
        dataIndex: 'number',
        key: 'edit',
        render: number => <Link to={`/redaguoti/dokumentas/${number}`}><Icon type="edit" /></Link>,
        width: '5%',
      },
      {
        title: '',
        dataIndex: 'number',
        key: 'delete',
        render: number => <Icon type ="delete" onClick={() => this.deleteDocument(number)}/>,
        width: '5%',
      }
    ];
     const {pagination, page, data}=this.state
     const Option = Select.Option;

    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
    <div className="table-operations">
        <Select style={{ width: 190 }} placeholder = "Pasirinkite dokumento būseną" onSelect={(value, event) => this.handleFilter(value, event)}>
            <Option value={`http://localhost:8099/api/documents/${this.state.email}/submitted`}>pateikti</Option>
            <Option value={`http://localhost:8099/api/documents/${this.state.email}/confirmed`}>patvirtinti</Option>
            <Option value={`http://localhost:8099/api/documents/${this.state.email}/all`}>visi</Option>
        </Select>
        <h3>{this.state.heading}</h3>
    </div>
    <Table
        columns={columns}
        rowKey={record => record.number}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        scroll={{ y: 360 }}
      />
    </div>
    </div>  
      );

  }
}


export default UserDocumentTable
