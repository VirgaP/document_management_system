import React, { Component } from 'react';
import { Pagination } from 'antd';


export class AntPagination extends Component {
    state = {
        current: 3,
      }

    onChange = (page) => {
        console.log(page);
        this.setState({
          current: page,
        });
      }
  render() {
    return (
      <div>
        <Pagination current={this.state.current} onChange={this.onChange} total={50} />
      </div>
    )
  }
}

export default AntPagination
