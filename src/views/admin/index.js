import React, { Component } from "react";

class Admin extends Component {
  render() {
    return (
      <div>
        admin page Hello
        <br />
        <a href="/admin/problematics">Actualiza las problematicas</a>
        <br />
        <a href="admin/proposals">Administras las propuestas</a>
      </div>
    );
  }
}

export default Admin;
