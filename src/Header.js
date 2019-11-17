import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      // <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      //    <Link className="navbar-brand" to="/">Livraria Avenida</Link>
      // </nav>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/"> <i class="fas fa-journal-whills"></i> Livraria Avenida</a>
      </nav>
    )
  }
}
