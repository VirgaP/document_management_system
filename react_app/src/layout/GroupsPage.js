import React, { Component } from 'react'
import GroupListContainer from '../GroupListContainer';
import UserGroupFormContainer from '../UserGroupFormContainer';

export class GroupsPage extends Component {
  render() {
    return (
      <div className="groups-page">
      <div className="row">
        <div className="col-lg-6 col-md-12">
        <GroupListContainer/>
        </div>
        <div className="col-lg-6 col-md-12">
        <UserGroupFormContainer/>
        </div>
      </div>
      </div>
    )
  }
}

export default GroupsPage
