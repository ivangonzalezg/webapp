import React, { Component } from "react";

class Admin extends Component {
  render() {
    return (
      <div>
        admin page Hello
        <br />
        <a href="/admin/problematics">Actualiza las problemáticas</a>
        <br />
        <a href="admin/proposals/1">Administras las propuestas</a>
      </div>
    );
  }
}

export default Admin;
