import React, { Component } from "react";
import { Nav, Navbar, ButtonGroup, Button } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSocialId");
    localStorage.removeItem("userLocation");
    window.location.reload();
  }

  render() {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userSocialId = localStorage.getItem("userSocialId");
    const userLocation = localStorage.getItem("userLocation");
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Imagina tu ciudá</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/*<Nav.Link href="/problematics">Problemáticas</Nav.Link>
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
            */}
          </Nav>
          {userEmail && userId && userName && userSocialId && userLocation ? (
            <div>
              <span>Bienvenido {userName} {" "}</span>
              <Button onClick={this.logout} variant="light">
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <ButtonGroup>
              <Button href="/login" variant="light">
                Iniciar sesión
              </Button>
              <Button href="/register" variant="light">
                Registrarse
              </Button>
            </ButtonGroup>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
