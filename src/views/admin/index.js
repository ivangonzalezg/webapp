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
      description5: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: ""
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
            ["name" + index]: dbinfo["name" + index],
            ["description" + index]: dbinfo["description" + index]
          });
        }
      });
  }

  enviar = () => {
    console.log(this.state);
  };

  update = () => {
    var database = firebase.database().ref();
    var tempObject = {};
    for (let index = 1; index < 6; index++) {
      tempObject["name" + index] = this.state["name" + index];
      tempObject["description" + index] = this.state["description" + index];
      tempObject["image" + index] = this.state["image" + index];
    }
    database.child("problems").update(tempObject);
    window.location.reload();
  };

  uploadImage(e) {
    const imageid = e.target.id;
    const type = e.target.files[0].type.split("/")[0];
    const image = e.target.files[0];
    if (type !== "image") {
      alert("Just images accepted");
      e.target.value = "";
      return;
    }
    const database = firebase.database().ref();
    const storage = firebase.storage().ref();
    const task = storage.child("problems").child(imageid);
    task.put(image).on(
      "state_changed",
      () => {},
      function(error) {},
      async function() {
        task.getDownloadURL().then(url => {
          database.child("problems").update({
            [imageid]: url
          });
        });
      }
    );
  }

  notSubmit(e) {
    e.preventDefault();
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
        <Form onSubmit={e => this.notSubmit(e)}>
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
          <Input type="file" id="image1" onChange={this.uploadImage} />
          <hr className="hr-admin" />
          <Button variant="success" type="submit" onClick={this.update}>
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
