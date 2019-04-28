import React from "react";
import { Container, Col, Row } from "react-bootstrap";
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
  }

  render() {
    var { name1, name2, name3, name4, name5 } = this.state;
    var { image1, image2, image3, image4, image5 } = this.state;
    return (
      <div>
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
          <center>
            <h1>IMAGINA TÚ CIUDÁ</h1>
          </center>
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
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <a href="/problematics/4">
                <img
                  className="image-home four"
                  src={image4}
                  alt={name4}
                  title={name4}
                />
              </a>
            </Col>
            <Col>
              <a href="/problematics/5">
                <img
                  className="image-home five"
                  src={image5}
                  alt={name5}
                  title={name5}
                />
              </a>
            </Col>
          </Row>
          <Row style={{ textAlign: "center", marginTop: "5%" }}>
            <Col>
              <h3>
                <strong>{this.state.nofregisters || "0 +"}</strong>
              </h3>
              <h3>
                <small>Registros</small>
              </h3>
            </Col>
            <Col>
              <h3>
                <strong>{this.state.nofregisters || "0 +"}</strong>
              </h3>
              <h3>
                <small>Comentarios</small>
              </h3>
            </Col>
            <Col>
              <h3>
                <strong>{this.state.nofregisters || "0 +"}</strong>
              </h3>
              <h3>
                <small>Propuestas recibidas</small>
              </h3>
            </Col>
            <Col>
              <h3>
                <strong>{this.state.nofregisters || "0 +"}</strong>
              </h3>
              <h3>
                <small>Votaciones</small>
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Home;
