import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, ButtonGroup, Button } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
          <ButtonGroup>
            <Button href="/login" variant="light">Iniciar sesión</Button>
            <Button href="/register" variant="light">Registrarse</Button>
          </ButtonGroup>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
