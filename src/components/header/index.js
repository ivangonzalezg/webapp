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
      <div>
        {userEmail && userId && userName && userSocialId && userLocation ? (
          <div>
            <span>Bienvenido {userName} </span>
            <Button onClick={this.logout} variant="light">
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <Nav className="header">
            <Nav.Item>
              <Nav.Link href="/">Inicio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/aboutus">Nosotros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login">Iniciar sesión</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Registrarse</Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </div>
    );
  }
}

export default Header;
