import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Target from "./Card";
import * as firebase from "firebase";

class Problematics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentyId: Number,
      data: [{}]
    };
  }
  componentDidMount() {
    var database = firebase.database().ref();
    const currentyId = this.props.match.params.id;
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        this.setState({ name: dbinfo["name" + currentyId] });
      });

    this.setState({
      currentyId: this.props.match.params.id
    });

    database
      .child("proposals")
      .child(this.props.match.params.id.toString())
      .once("value")
      .then(data => {
        var datos = [];
        const dbinfo = data.toJSON();
        data.forEach(value => {
          datos.push(value.val());
        });
        var i = 0;
        for (var key in dbinfo) {
          datos[i].id = key;
          i = +1;
        }
        this.setState({
          data: datos
        });
      });
  }

  render() {
    var card = this.state.data.map((dato, i) => {
      return (
        <div key={i}>
          <Target info={dato} />
        </div>
      );
    });
    return (
      <div>
        <Container>
          <Row>
            <h1>Propuestas para mejorar la {this.state.name}</h1>
          </Row>
          <Row>
            <Col>{card}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Problematics;
