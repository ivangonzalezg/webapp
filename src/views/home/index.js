import React from "react";
import Target from "./Card";
import { Container, Col, Row } from "react-bootstrap";
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
    var {
      description1,
      description2,
      description3,
      description4,
      description5
    } = this.state;
    var { image1, image2, image3, image4, image5 } = this.state;
    return (
      <div>
        <center>
          <h1>Principales problemáticas de la ciudad</h1>
        </center>
        <Container>
          <Row>
            <Col>
              <img className="image-home fisrt-row-home" src={image1} alt={name1} title={name1} />
            </Col>
            <Col>
              <img className="image-home fisrt-row-home" src={image2} alt={name2} title={name2}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <img className="image-home" src={image3} alt={name3} title={name3}/>
            </Col>
            <Col>
              <img className="image-home" src={image4} alt={name4} title={name4}/>
            </Col>
            <Col>
              <img className="image-home" src={image5} alt={name5} title={name5}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Home;
