import Institution from './Institution';  
import React, { Component } from 'react';
import axios from 'axios';
import DocumentListPagination from './DocumentListPagination';
import AntPagination from './AntPagination';
import { Table, Tag } from 'antd';
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
        currentPage: 0 | '',
        total:''
    }

    // this.fetchData = this.fetchData.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    // this.previousPage = this.previousPage.bind(this);
    // this.nextPage = this.nextPage.bind(this);
    console.log(this.state.documents)
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

        axios.get('http://localhost:8099/api/documents/count')
        .then(result => {
            console.log("RESULT",result)
        const total = result.data
        this.setState({total: total});
        console.log("total", total)
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch({
          size: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
    
      fetch = (params = {}) => {
          const {currentPage}=this.state
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
          url: 'http://localhost:8099/api/documents/test',
          method: 'get',
          data: {
            // page: 0,
            size: 10,
            page: currentPage,
            ...params,
          },
          type: 'json',
        }).then((data) => {
        console.log("data resp ", data)
          const pagination = { ...this.state.pagination };
          // Read total count from server
        //   pagination.total = 77;
          pagination.total = this.state.total;
          this.setState({
            loading: false,
            data: data.content,
            // size: data.size,
            currentPage: data.number +1,
            pagination,
          });
          console.log("data ", this.state.data)
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
        sorter: true,
        render: type => type.title,
        width: '20%',
      }, {
        title: 'Data',
        dataIndex: 'createdDate',
        render: createdDate => createdDate,
        width: '20%',
      },{
        title: 'Vartotojas',
        dataIndex: 'userDocuments',
        render: userDocuments => userDocuments.map(el=>el.user.name + ' ' + el.user.surname),
        width: '20%',
      }
    //   {
    //     title: 'Būsena',
    //     dataIndex: 'userDocuments',
    //     // filters: [
    //     //     {  render: userDocuments => userDocuments.map(el=>(String (el.submitted)=== 'true')), value: 'pateiktas' },
    //     //     {  render: userDocuments => userDocuments.map(el=>(String (el.confirmed)=== 'true')), value: 'patvirtintas' },
    //     //   ],
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
    //     width: '20%',
    //   }
    ];
     const {pagination}=this.state
    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
    
    <Table
        columns={columns}
        rowKey={record => record.number}
        dataSource={this.state.data}
        // dataSource={[...this.state.data.from({ length: (current - 1) * pageSize }), ...this.state.data]}
        pagination={this.state.pagination}
        // pagination= { {pageSizeOptions: ['10', '20'], showSizeChanger: true}}
        // pagination={{ pageSize: pagination.pageSize, total: pagination.total, current:pagination.current }}
        // pagination={{ pageSize: 10 }} 
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
