import React, { Component } from 'react';
import axios from 'axios';
import { Input, Table, Tag, Button, Icon, List } from 'antd';
import {Link} from 'react-router-dom'


const Search = Input.Search;

export class UserSearch extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          result: {}
        }; 
    }

    handleSearch(value){
         console.log("search value ", value)
         axios.get(`http://localhost:8099/api/users/findUsers/${value}`)
          .then(result => {
          console.log("search url", result)
          this.setState({result: result.data})
          })
          .catch(function (error) {
            console.log(error);
          });
    }

  render() {
    const columns = [{
        title: 'Vardas',
        dataIndex: 'name',
        width: '15%',
      },
      {
        title: 'Pavardė',
        dataIndex: 'surname',
        width: '20%',
      },
      {
        title: 'El.paštas',
        dataIndex: 'email',
        render: email =><Link to={`/vartotojas/${email}`}>{email}</Link>,
        width: '20%',
      },
    //   {
    //     title: 'Viso sukurta',
    //     dataIndex: 'userDocuments',
    //     key: 'all',
    //     render: userDocuments => userDocuments.length,
    //     width: '10%',
    //   },
    //   {
    //     title: 'Grupės',
    //     dataIndex: 'userGroups',
    //     key: 'groups',
    //     render: userGroups => (
    //       <span>
    //         {userGroups.map(tag => {
    //           return <Tag color='geekblue' key={tag.name}>{tag.name.toUpperCase()}</Tag>;
    //         })}
    //       </span>
    //     ),
    //     width: '25%',
    //   },
  {
    title: '',
    dataIndex: 'email',
    key: 'edit',
    render: email => <Link to={`/redaguoti/vartotojas/${email}`}><Icon type="edit" /></Link>,
    width: '5%',
  } 
    ];
      
    const {result} = this.state
    return (
      <div className="container">
        <Search
      placeholder="Įveskite vartotojo el.pašto adresą"
      onSearch={value => this.handleSearch(value)}
      enterButton
    /> 
    <br></br>
   {result.length > 0 && <Table dataSource={result} columns={columns} /> }

    {/* <List
    itemLayout="horizontal"
    dataSource={this.state.result}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          description={item.name + item.surname}
        />
      </List.Item>
    )}
  /> */}
  {/* {result.length > 0 && <p>{result.map(item => item.name)}</p>} */}
      </div>
    )
  }
}

export default UserSearch
