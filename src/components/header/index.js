import React, { Component } from "react";
import { Nav } from "react-bootstrap";

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
        {window.location.pathname !== "/" ? (
          <div>
            {userEmail && userId && userName && userSocialId && userLocation ? (
              <Nav className="justify-content-end">
                <Nav.Item>
                  <Nav.Link className="welcome-header-others">
                    Bienvenido {userName}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/" className="logout-header-others">
                    Inicio
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={this.logout}
                    className="logout-header-others"
                  >
                    Cerrar sesión
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav className="justify-content-end header">
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
        ) : null}
      </div>
    );
  }
}

export default Header;
