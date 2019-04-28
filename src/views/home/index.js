import React from "react";
import { Container, Col, Row, Nav } from "react-bootstrap";
import MainImage from "../../img/amanecera.jpg";
import * as firebase from "firebase";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name1: "",
      name2: "",
      name3: "",
      name4: "",
      name5: "",
      description1: "",
      description2: "",
      description3: "",
      description4: "",
      description5: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: ""
    };
  }
  componentDidMount() {
    var database = firebase.database().ref();
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        for (let index = 1; index < 6; index++) {
          this.setState({
            ["name" + index]: dbinfo["name" + index],
            ["description" + index]: dbinfo["description" + index],
            ["image" + index]: dbinfo["image" + index]
          });
        }
      });
    database.child("counters").on("value", data => {
      console.log(data.toJSON());
      this.setState({ counters: data.toJSON() });
    });
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
    var { name1, name2, name3, name4, name5 } = this.state;
    var { image1, image2, image3, image4, image5 } = this.state;
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userSocialId = localStorage.getItem("userSocialId");
    const userLocation = localStorage.getItem("userLocation");
    var registered = null;
    var votes = null;
    var proposals = null;
    var comments = null;
    if (this.state.counters) {
      registered = this.state.counters.registered;
      votes = this.state.counters.votes;
      proposals = this.state.counters.proposals;
      comments = this.state.counters.comments;
    }
    return (
      <div>
        <div>
          {userEmail && userId && userName && userSocialId && userLocation ? (
            <Nav className="header-home-login">
              <Nav.Item>
                <Nav.Link className="welcome-header">
                  Bienvenido {userName}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/" className="logout-header">
                  Inicio
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={this.logout} className="logout-header">
                  Cerrar sesión
                </Nav.Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="header-home">
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
        <div className="image-color">
          <div className="image-text">
            Haz parte del
            <strong>
              <span>CAMBIO</span>
            </strong>
          </div>
          <img src={MainImage} alt="Main index" className="main-image" />
        </div>
        <Container>
          <br />
          <br />
          <br />
          <center>
            <h1>Con tu ayuda transformaremos a Barranquilla</h1>
            <h3>¡Genera una propuesta de cambio!</h3>
          </center>
          <br />
          <Row style={{ textAlign: "center", marginTop: "5%" }}>
            <Col>
              <a href="/problematics/1">
                <img
                  className="image-home one"
                  src={image1}
                  alt={name1}
                  title={name1}
                />
              </a>
              {name1.toUpperCase()}
            </Col>
            <Col>
              <a href="/problematics/2">
                <img
                  className="image-home two"
                  src={image2}
                  alt={name2}
                  title={name2}
                />
              </a>
              {name2.toUpperCase()}
            </Col>
            <Col>
              <a href="/problematics/3">
                <img
                  className="image-home three"
                  src={image3}
                  alt={name3}
                  title={name3}
                />
              </a>
              {name3.toUpperCase()}
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <div className="four">
                <a href="/problematics/4">
                  <img
                    className="image-home"
                    src={image4}
                    alt={name4}
                    title={name4}
                  />
                </a>
                {name4.toUpperCase()}
              </div>
            </Col>
            <Col>
              <div className="five">
                <a href="/problematics/5">
                  <img
                    className="image-home"
                    src={image5}
                    alt={name5}
                    title={name5}
                  />
                </a>
                {name5.toUpperCase()}
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row style={{ textAlign: "center", marginTop: "5%" }}>
            <Col>
              <h3>
                <strong>{registered + " +" || "0 +"}</strong>
              </h3>
              <h3>
                <small>Registros</small>
              </h3>
            </Col>
            <Col>
              <h3>
                <strong>{comments + " +" || "0 +"}</strong>
              </h3>
              <h3>
                <small>Comentarios</small>
              </h3>
            </Col>
            <Col>
              <h3>
                <strong>{proposals + " +" || "0 +"}</strong>
              </h3>
              <h3>
                <small>Propuestas recibidas</small>
              </h3>
            </Col>
            <Col>
              <h3>
                <strong>{votes + " +" || "0 +"}</strong>
              </h3>
              <h3>
                <small>Votaciones</small>
              </h3>
            </Col>
          </Row>
          <br />
          <br />
          <br />
        </Container>
      </div>
    );
  }
}
export default Home;
