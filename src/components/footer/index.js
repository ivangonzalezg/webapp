import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Facebook from "../../img/social/facebook.png";
import Twitter from "../../img/social/twitter.png";
import Instagram from "../../img/social/instagram.jpg";
import Whatsapp from "../../img/social/whatsapp.png";
import Uninorte from "../../img/sponsor/uni.png";
import Camara from "../../img/sponsor/camara.png";
import Nativapps from "../../img/sponsor/nati.png";

class Footer extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="9">
            <Row>
              <h5>
                <strong>Patrocinadores</strong>
              </h5>
            </Row>
            <Row>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://camarabaq.org.co/"
              >
                <img src={Camara} width="60px" alt="Twitter logo" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://uninorte.edu.co"
              >
                <img src={Uninorte} width="60px" alt="Twitter logo" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://nativapps.com"
              >
                <img src={Nativapps} width="60px" alt="Twitter logo" />
              </a>
            </Row>
          </Col>
          <Col sm="auto">
            <div className="vl" />
          </Col>
          <Col sm="2">
            <Row style={{ paddingBottom: "5%" }}>Redes Sociales</Row>
            <Row style={{ paddingBottom: "5%" }}>
              <Col>
                <a href="#instagram">
                  <img src={Instagram} width="40px" alt=" Instagramlogo" />
                </a>
                <a href="#facebook">
                  <img src={Facebook} width="33px" alt="facebook logo" />
                </a>
                <a href="#whatsapp">
                  <img src={Whatsapp} width="40px" alt="Whatsapp logo" />
                </a>
                <a href="#twitter">
                  <img src={Twitter} width="33px" alt="Twitter logo" />
                </a>
              </Col>
            </Row>
            <Row>Barranquilla</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
