import Institution from './Institution';  
import React, { Component } from 'react';
import axios from 'axios';
import DocumentListPagination from './DocumentListPagination';
import AntPagination from './AntPagination';
import { Table, Tag, Input, Button } from 'antd';
import {Link } from "react-router-dom";

import AntDocumentTable from './AntDocumentTable';

import reqwest from 'reqwest';

export class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        pagination: {},
        loading: false,
        page:'',
        filterDropdownVisible: false,
        searchText: '',
        submitted: [],
        filteredInfo:{}
    }
    // this.deleteItem = this.deleteItem.bind(this);
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }

    componentDidMount() {
        this.fetch();
    }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
          filterDropdownVisible: false,
          data: this.state.data.map((record) => {
            const match = record.email.match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record,
              name: (
                <span>
                  {record.name.split(reg).map((text, i) => (
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
          filteredInfo: filters,
        });
        
        // const desc = (sorter.order == "descend" ? "desc" : "asc");
        this.fetch({
         results: pagination.pageSize,
         page: pagination.current,
        //  sort: sorter.field + decodeURIComponent("%2c")+desc,
        //  sortOrder: decodeURIComponent("%2c")+desc,
          ...filters,
        });
        console.log("filter ", filters)

      }
    
      fetch = (params = {}) => {
          const {page}=this.state
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
          url: 'http://localhost:8099/api/users/pages',
          method: 'get',
          data: {
            size: 10,
            // sort: 'createdDate,desc',
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

      clearFilters = () => {
        this.setState({ filteredInfo: null });
      }
    
    // deleteItem(number) {
    //     this.setState(prevState=>{
    //         const newItems = prevState.documents.filter((document)=>document.number!==number);
    //         return {
    //             documents: newItems
    //         }
    //     })
    //   }

  render() {

    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};

    const columns = [{
        title: 'Vardas',
        dataIndex: 'name',
        // sorter: true,
        width: '20%',
      },
      {
        title: 'Pavardė',
        dataIndex: 'surname',
        // sorter: true,
        width: '20%',
      },
      {
        title: 'El.paštas',
        dataIndex: 'email',
        render: email =><Link to={`/vartotojas/${email}`}>{email}</Link>,
             filterDropdown: (
            <div className="custom-filter-dropdown">
              <Input
                placeholder="Įveskite el.paštą"
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
      }
      ,{
        title: 'Viso sukurta',
        dataIndex: 'userDocuments',
        render: userDocuments => userDocuments.length,
        width: '10%',
      }, 
      {
        title: 'Pateikti',
        dataIndex: 'userDocuments',
        // render: userDocuments=> userDocuments.forEach(function(item){
        //   let submitted =[];
        //   if(item.submitted == true){
        //     submitted.push(item) 
        //     console.log("DATA", submitted.length)
        //     return submitted.length
        //   } 
        // }),
        render: userDocuments => userDocuments.map(item => {
          let submitted =[];
          if(item.submitted == true){
            submitted.push(item) 
            console.log("DATA", submitted.length)
            // return submitted.length
          } 
          return submitted.length
        }),
        width: '10%',
      }, 
    //   {
    //     title: 'Data',
    //     dataIndex: 'createdDate',
    //     key: 'createdDate',
    //     // sorter: true,
    //     // defaultSortOrder: 'desc',
    //     render: createdDate => createdDate,
    //     width: '20%',
    //   },
    //   {
    //     title: 'Vartotojas',
    //     dataIndex: 'userDocuments',
    //     render: userDocuments => userDocuments.map(el=>el.user.name + ' ' + el.user.surname),
    //     width: '20%',
    //   },
    //   {
    //     title: 'Busena',
    //     dataIndex: 'tags',
    //     render={tags => (
    //         <span>
    //           {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    //         </span>
    //       )}
    //   }
    ];
     const {pagination, data, page}=this.state
    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
        <div className="table-operations">
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
 
    <Table
        columns={columns}
        rowKey={record => record.email}
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


export default UsersTable
