import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Admin extends Component {
  render() {
    return (
      <Container>
        <h1>Bienvenido Admin</h1>
        <br />
        <br />
        <br />
        <h2>Opciones: </h2>
        <br />
        <br />
        <br />
        <h4 style={{ paddingLeft: "7%" }}>
          <a href="/admin/problematics">Actualizar problemáticas</a>
        </h4>
        <br />
        <h4 style={{ paddingLeft: "7%" }}>
          <a href="admin/proposals/1">Administras las propuestas</a>
        </h4>
      </Container>
    );
  }
}

export default Admin;
