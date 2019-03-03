import Institution from './Institution';  
import React, { Component } from 'react';
import axios from 'axios';
import DocumentListPagination from './DocumentListPagination';
import AntPagination from './AntPagination';
import { Table, Tag, Input, Button } from 'antd';
import {Link } from "react-router-dom";

import AntDocumentTable from './AntDocumentTable';

import reqwest from 'reqwest';

export class DocumentListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id:this.props,
        documents: [],
        data: [],
        pagination: {},
        loading: false,
        page:'',
        filterDropdownVisible: false,
        searchText: '',
    }
    this.deleteItem = this.deleteItem.bind(this);
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }

    // fetchData() {
    //     const {currentPage} = this.state;
    //     const pageLimit = 5;
    //     // axios.get('http://localhost:8099/api/documents')
    //     axios.get(`http://localhost:8099/api/documents/test?page=${currentPage}&size=${pageLimit}&sort=createdDate,desc`)
    // .then(response => {
    //             const { page, size } = this.state;
    //             this.setState({
    //                 // documents: response.data.content
    //                 data: response.data.content

    //                 // documents: response.data,
    //             });
    //             console.log("Documents by page ", this.state.documents)
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 error: 'Error while fetching data.'
    //             });
    //         });
    //     }

    componentDidMount() {
        // this.fetchData();
        this.fetch();
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

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          page: this.state.page,          
        });
        this.fetch({
         results: pagination.pageSize,
         page: pagination.current,
         sort: sorter.field,
         sortOrder: sorter.order,
          ...filters,
        });
        console.log("filter ", filters)

      }
    
      fetch = (params = {}) => {
          const {page}=this.state
        console.log('params:', params);
        this.setState({ loading: true });
        console.log('current:', this.state.pagination.current -1);
        reqwest({
          url: 'http://localhost:8099/api/documents/test',
          method: 'get',
          data: {
            size: 10,
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
    
    deleteItem(number) {
        this.setState(prevState=>{
            const newItems = prevState.documents.filter((document)=>document.number!==number);
            return {
                documents: newItems
            }
        })
      }
  render() {


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
        width: '30%',
      },{
        title: 'Tipas',
        dataIndex: 'type',
        render: type => type.title,
        // filters: [
        //     // { text: String(type => type.title), value: String(type => type.title)},
        //     { text: 'Pranesimas', value: 'Pranesimas' },
        //   ],
        // onFilter: (value, record) => record.type.title.includes(value),
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
        sorter: true,
        render: createdDate => createdDate,
        width: '20%',
      },
      {
        title: 'Vartotojas',
        dataIndex: 'userDocuments',
        render: userDocuments => userDocuments.map(el=>el.user.name + ' ' + el.user.surname),
        width: '20%',
      },
    //   {
    //     title: 'Būsena',
    //     dataIndex: 'userDocuments',

    //     filters: [
    //         {  text: 'atmestas', value: userDocuments => userDocuments.map(el=>(String (el.rejected)=== 'true')) },
    //         {  text: 'patvirtintas', value: userDocuments => userDocuments.map(el=>(String (el.confirmed)=== 'true')) },
    //       ],
    //     // render: userDocuments => userDocuments.map(el=>(String (el.confirmed)=== 'true')? 'Patvirtintas' : 'Sukurtas'),
    //     render: userDocuments => (
    //         <span>
    //           {userDocuments.map(tag => {
    //             let confirmed = (String(tag.confirmed ==='true' ))
    //             let rejected = (String(tag.rejected ==='true' ))
    //             let submitted = (String(tag.submitted ==='true' ))

    //             let color = tag.length > 5 ? 'geekblue' : 'green';
    //             if (tag.confirmed === confirmed) {
    //               color = 'volcano';
    //             }
    //             if (tag.rejected === rejected) {
    //                 color = 'volcano';
    //               }
    //             return <Tag color={color} key={tag}>{confirmed ? "patvirtintas" : ""}</Tag>;
    //           })}
    //         </span>
    //       ),
    //     width: '10%',
    //   }
    ];
     const {pagination, data, page}=this.state
    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
    
    <Table
        columns={columns}
        rowKey={record => record.number}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        // pagination= {{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20']}}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        scroll={{ y: 360 }}
      />
    </div>
    </div>  
      );

  }
}


export default DocumentListContainer
