import React, { Component } from "react";
import * as firebase from "firebase";
import Input from "@material-ui/core/Input";
import { Container, Form, Button, Card } from "react-bootstrap";

class Admin extends Component {
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
      description5: ""
    };
  }

  async componentDidMount() {
    var database = firebase.database().ref();
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        console.log(data.toJSON());
        for (let index = 1; index < 6; index++) {
          this.setState({
            ["name" + index]: dbinfo["name" + index],
            ["description" + index]: dbinfo["description" + index]
          });
        }
      });
  }

  enviar = () => {
    console.log(this.state);
  };

  update(e) {
    e.preventDefault();
    var database = firebase.database().ref();
    var tempObject = {};
    for (let index = 1; index < 6; index++) {
      tempObject["name" + index] = this.state["name" + index];
      tempObject["description" + index] = this.state["description" + index];
    }
    database.child("problems").set(tempObject);
    window.location.reload();
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <Container>
        <center>
          <h1>Actualiza las problematicas</h1>
        </center>
        <br />
        <Form onSubmit={e => this.update(e)}>
          <Card.Title>Problemático #1</Card.Title>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id="name1"
              defaultValue={this.state.name1}
              placeholder="Nombre de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              id="description1"
              value={this.state.description1}
              placeholder="Una pequeña descripción de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Input
            type="file"
            id="iam"
            className="attachInput-configure"
            onChange={this.uploadButtonState}
            disabled={this.state.filesSize === -1}
          />
          <hr className="hr-admin" />
          <Button variant="success" type="submit">
            Iniciar
          </Button>
        </Form>
        <br />
        <br />
        <Button onClick={this.enviar}>State</Button>
      </Container>
    );
  }
}

export default Admin;
