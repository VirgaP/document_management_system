import Institution from './Institution';  
import React, { Component } from 'react';
import axios from 'axios';
import { Table, Tag, Input, Button , Icon} from 'antd';
import {Link } from "react-router-dom";
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
        filteredInfo: null
      }
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

    handleTableChange = (pagination, filters, sorter, value) => {
      console.log("VALUE", value)
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          page: this.state.page,   
          filteredInfo: filters,
          searchText: value
        });
        
        this.fetch({
         results: pagination.pageSize,
         page: pagination.current,
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
        this.setState({ filteredInfo: null, searchText: null });
      }

  render() {

    let { filteredInfo, searchText } = this.state;
    filteredInfo = filteredInfo || {};
    searchText = searchText || {};

    const columns = [{
        title: 'Vardas',
        dataIndex: 'name',
        // sorter: true,
        width: '15%',
      },
      {
        title: 'Pavardė',
        dataIndex: 'surname',
        // sorter: true,
        width: '15%',
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
          filterDropdownVisible: this.state.filterDropdownVisible || null,
          onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
        width: '15%',
      }
      ,{
        title: 'Viso sukurta',
        dataIndex: 'userDocuments',
        key: 'all',
        render: userDocuments => userDocuments.length,
        filters: [
          { text: '> 10', value: 10 },
          // { text: '< 10', value: 10 },
        ],
        filteredValue: filteredInfo.all || null,
        onFilter: (value, record) => record.userDocuments.length > value,
        width: '10%',
      }, 
      {
        title: 'Pateikti',
        dataIndex: 'userDocuments',
        key: 'submitted',
        render: userDocuments => userDocuments.map(item => {
          let submitted =[];
          if(item.submitted == true){
            submitted.push(item) 
            console.log("DATA", submitted.length)
          } 
          return submitted.length
        }),
        width: '10%',
      }, 
      {
        title: 'Patvirtinti',
        dataIndex: 'userDocuments',
        key: 'confirmed',
        render: userDocuments => userDocuments.map(item => {
          let confirmed =[];
          if(item.confirmed == true){
            confirmed.push(item) 
            console.log("DATA", confirmed.length)
          } 
          return confirmed.length
        }),
        width: '10%',
      },
      {
            title: 'Grupės',
            dataIndex: 'userGroups',
            key: 'groups',
            render: userGroups => (
              <span>
                {userGroups.map(tag => {
                  return <Tag color='geekblue' key={tag.name}>{tag.name.toUpperCase()}</Tag>;
                })}
              </span>
            ),
            width: '25%',
          },
      {
        title: '',
        dataIndex: 'email',
        key: 'edit',
        render: email => <Link to={`/redaguoti/vartotojas/${email}`}><Icon type="edit" /></Link>,
        width: '5%',
      }

    ];
     const {pagination, data, page}=this.state
    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
        <div className="table-operations">
          <Button onClick={this.clearFilters}>Išvalyti filtravimą</Button>
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
