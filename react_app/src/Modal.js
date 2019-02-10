import React, { Component } from 'react';

class Modal extends Component {
   
    removeTask = () => this.props.removeTask(this.props.data);
    closeModal = () => this.props.closeModal();
    render() {
      const { title, number } = this.props.data;
      if (this.props.displayModal) {
        return (
          <div>
            <h5>You want to delete task {title} : {number}</h5>
            <button onClick={this.removeTask}>Confirm</button>
            <button onClick={this.closeModal}>Close</button>
          </div>
        )
      }
      return null;
    }
}

export default Modal;