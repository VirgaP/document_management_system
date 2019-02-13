import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export class UserHomePage extends Component {
  render() {
    return (
      <div className="container">
       <div class="card-columns">
  <div class="card bg-warning">
    <div class="card-body text-center">
      <p class="card-text"> <Link to='/naujas-dokumentas'>Kurti naują dokumentą</Link></p>
    </div>
  </div>
  <div class="card bg-success">
    <div class="card-body text-center">
      <p class="card-text"><Link to='/mano-dokumentai'>Peržiūrėti sukurtus dolumentus</Link></p>
    </div>
  </div>
</div>
  </div>
    )
  }
}

export default UserHomePage
