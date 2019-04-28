import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import * as firebase from "firebase";

class Problematics extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    var database = firebase.database().ref();
    const currentyId = this.props.match.params.id;
    const link = "/problematics/create/" + currentyId;
    this.setState({ currentyId, link });
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        this.setState({ name: dbinfo["name" + currentyId] });
      });
    database
      .child("proposals")
      .child(currentyId)
      .once("value")
      .then(value => {
        if (value.toJSON()) {
          console.log(Object.keys(value.toJSON()).length);
        }
      });
  }

  render() {
    return (
      <Container>
        <h1>Propuestas para mejorar la {this.state.name}</h1>
        <Button href={this.state.link}>Haz una propuesta</Button>
      </Container>
    );
  }
}

export default Problematics;
