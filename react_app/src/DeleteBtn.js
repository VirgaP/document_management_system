import React, { Component } from 'react'

export class DeleteBtn extends Component {
    deleteBook = (event) => {
        alert('click on  delete' + event);
    }

    render(){
        return (

            <button className="btn btn-danger" onClick={this.deleteBook.bind(this)}>Delete </button>
        )
    }
}

export default DeleteBtn
