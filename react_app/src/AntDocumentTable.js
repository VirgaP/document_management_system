import React, { Component } from 'react';
import { Table } from 'antd';



export class AntDocumentTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            data: this.props.dataSet
        }
    
        // this.fetchData = this.fetchData.bind(this);
        // this.deleteItem = this.deleteItem.bind(this);
        // this.previousPage = this.previousPage.bind(this);
        // this.nextPage = this.nextPage.bind(this);
        console.log("props",this.props)
        console.log('data ',this.state.data)
        }
   
//    componentWillMount(){
//     this.setState({data: this.props.dataSet})
//     }

    
  render() {
    const {data}=this.state
    const mappedData = [];
    const length = data.length;

    data.map((item) => (                                        
        mappedData.push({ 
            key: item.number, 
            title: item.title,


        })                    
    ))

//     for (let i = 0; i < length; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`,
//     });
// }
    return (
      <div>
            <Table columns={this.props.columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }}/>
      </div>
    )
  }

}

export default AntDocumentTable
