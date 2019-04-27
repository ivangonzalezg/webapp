import React, { Component } from "react";
import * as firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import { Container, Form, Button, Card } from "react-bootstrap";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      problems: [],
      show: false
    };

    this.problems = [];

    this.amount = [0, 1, 2, 3, 4];
    this.properties = ["description", "name"];
  }

  async componentDidMount() {
    var tempArray = [];
    for (let i = 0; i < this.amount.length; i++) {
      var tempObject = {};
      for (let j = 0; j < this.properties.length; j++) {
        tempObject[this.properties[j]] = "";
      }
      tempArray.push(tempObject);
    }
    await this.setState({ problems: tempArray });
    this.setState({ show: true });
    /*var database = firebase.database().ref();
    database
      .child("problems")
      .once("value")
      .then(data => {
        this.setState({ problems: data.val() });
        console.log(this.state.problems);
      });*/
  }

  enviar = () => {
    console.log(this.state);
  };

  update(e) {
    var database = firebase.database().ref();
    e.preventDefault();
    for (let index = 0; index < this.amount.length; index++) {
      var tempObject = {};
      if (this.state["name" + index]) {
        tempObject["name"] = this.state["name" + index];
      }
      if (this.state["description" + index]) {
        tempObject["description"] = this.state["description" + index];
      }
      this.problems[index] = tempObject;
    }
    console.log(this.problems);
    this.setState({
      problems: this.problems
    });
    database.child("problems").update(this.problems);
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
        {this.state.show && (
          <Form onSubmit={e => this.update(e)}>
            {this.amount.map(index => {
              return (
                <div key={index}>
                  <Card.Title>Problemático #{index}</Card.Title>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      id={"name" + index}
                      defaultValue={this.state.problems[index]["name"]}
                      placeholder="Nombre de la problemática"
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="4"
                      id={"description" + index}
                      defaultValue={this.state.problems[index]["description"]}
                      placeholder="Una pequeña descripción de la problemática"
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  {index !== this.amount.length - 1 && (
                    <hr className="hr-admin" />
                  )}
                </div>
              );
            })}
            <Button variant="success" type="submit">
              Iniciar
            </Button>
          </Form>
        )}
        <Button onClick={this.enviar}>Enviar</Button>
      </Container>
    );
  }
}

export default Admin;
