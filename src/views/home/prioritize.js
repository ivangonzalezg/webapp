import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import * as firebase from "firebase";
import Loading from ".././../components/loading";

class Prioritize extends Component {
  constructor() {
    super();

    this.state = {
      status: false,
      first: "",
      second: "",
      third: "",
      message: ""
    };
  }

  async componentDidMount() {
    var database = firebase.database().ref();
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        for (let index = 1; index < 6; index++) {
          this.setState({
            ["name" + index]: dbinfo["name" + index]
          });
        }
        this.setState({ status: true });
      });
  }

  sendSurvey = e => {
    e.preventDefault();
    this.setState({
      message: ""
    });
    const { first, second, third } = this.state;
    if (first === second || second === third || third === first) {
      this.setState({
        message: "No puede tener opciones repetidas"
      });
      return;
    }
    var database = firebase.database().ref();
    const date = new Date().getTime();
    const tempObject = { [date]: [first, second, third] };
    database
      .child("survey")
      .update(tempObject)
      .then(() => {
        window.location.pathname = "/";
      });
  };

  render() {
    const { name1, name2, name3, name4, name5, message } = this.state;
    return (
      <Container>
        <center>
          <h1>¿Cúal de estos restos es el reto que más quieres resolver?</h1>
        </center>
        <br />
        <h3>Ayudanos a priorizar los problemas de nuestra ciudad</h3>
        <br />
        {this.state.status ? (
          <div>
            <Form
              onSubmit={!this.state.loading ? e => this.sendSurvey(e) : null}
            >
              <Form.Group>
                <Form.Label>Principal prioridad</Form.Label>
                <Form.Control
                  required
                  as="select"
                  onChange={event =>
                    this.setState({ first: event.target.value })
                  }
                >
                  <option />
                  <option>{name1}</option>
                  <option>{name2}</option>
                  <option>{name3}</option>
                  <option>{name4}</option>
                  <option>{name5}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Mediana prioridad</Form.Label>
                <Form.Control
                  required
                  as="select"
                  onChange={event =>
                    this.setState({ second: event.target.value })
                  }
                >
                  <option />
                  <option>{name1}</option>
                  <option>{name2}</option>
                  <option>{name3}</option>
                  <option>{name4}</option>
                  <option>{name5}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Baja prioridad</Form.Label>
                <Form.Control
                  required
                  as="select"
                  onChange={event =>
                    this.setState({ third: event.target.value })
                  }
                >
                  <option />
                  <option>{name1}</option>
                  <option>{name2}</option>
                  <option>{name3}</option>
                  <option>{name4}</option>
                  <option>{name5}</option>
                </Form.Control>
              </Form.Group>
              <center>
                <span>{message}</span>
              </center>
              <Button type="submit">Enviar información</Button>
            </Form>
          </div>
        ) : (
          <div style={{ paddingTop: "5%" }}>
            <center>
              <Loading width="50px" height="50px" />
            </center>
          </div>
        )}
      </Container>
    );
  }
}

export default Prioritize;
