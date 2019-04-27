import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  search(e) {
    e.preventDefault();
  }
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Imagina tu ciudá</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/problematicas">Problemáticas</Nav.Link>
            <NavDropdown title="Información" id="basic-nav-dropdown">
              <NavDropdown.Item href="/aboutus">
                Sobre nosotros
              </NavDropdown.Item>
              <NavDropdown.Item href="/terms">
                Terminos y condiciones
              </NavDropdown.Item>
              <NavDropdown.Item href="/privacy">
                Politicas de privacidad
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={e => this.search(e)}>
            <FormControl
              type="text"
              placeholder="Busca una propuesta"
              className="mr-sm-2"
            />
            <Button variant="outline-dark">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
