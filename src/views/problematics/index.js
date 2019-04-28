import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Target from "./Target";
import * as firebase from "firebase";
import Button from '@material-ui/core/Button';

class Problematics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentyId: Number,
      data: []
    };
  }
  componentWillMount() {
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
        console.log("s: ",this.state.data)
      });
  }

  render() {
      console.log("info: ",this.state.data)
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
            <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
            </Button>
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
