import React, { Component } from "react";
import * as firebase from "firebase";
import Input from "@material-ui/core/Input";
import { Container, Form, Button, Card } from "react-bootstrap";

class Problematic extends Component {
  constructor() {
    super();

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

  update = () => {
    var database = firebase.database().ref();
    var tempObject = {};
    for (let index = 1; index < 6; index++) {
      tempObject["name" + index] = this.state["name" + index];
      tempObject["description" + index] = this.state["description" + index];
    }
    database.child("problems").update(tempObject);
    window.location.reload();
  };

  uploadImage(e) {
    const imageid = e.target.id;
    const image = e.target.files[0];
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
          <h1>Actualiza las problemáticas</h1>
        </center>
        <br />
        <Form onSubmit={e => this.notSubmit(e)}>
          <Card.Title>Problemática #1</Card.Title>
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
          <Input type="file" className="file-admin" inputProps={{accept:"image/*"}} id="image1" onChange={this.uploadImage} />
          <hr className="hr-admin" />

          <Card.Title>Problemática #2</Card.Title>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id="name2"
              defaultValue={this.state.name2}
              placeholder="Nombre de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              id="description2"
              value={this.state.description2}
              placeholder="Una pequeña descripción de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Input type="file" className="file-admin" inputProps={{accept:"image/*"}} id="image2" onChange={this.uploadImage} />
          <hr className="hr-admin" />

          <Card.Title>Problemática #3</Card.Title>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id="name3"
              defaultValue={this.state.name3}
              placeholder="Nombre de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              id="description3"
              value={this.state.description3}
              placeholder="Una pequeña descripción de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Input type="file" className="file-admin" inputProps={{accept:"image/*"}} id="image3" onChange={this.uploadImage} />
          <hr className="hr-admin" />

          <Card.Title>Problemática #4</Card.Title>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id="name4"
              defaultValue={this.state.name4}
              placeholder="Nombre de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              id="description4"
              value={this.state.description4}
              placeholder="Una pequeña descripción de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Input type="file" className="file-admin" inputProps={{accept:"image/*"}} id="image4" onChange={this.uploadImage} />
          <hr className="hr-admin" />

          <Card.Title>Problemática #5</Card.Title>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              id="name5"
              defaultValue={this.state.name5}
              placeholder="Nombre de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              id="description5"
              value={this.state.description5}
              placeholder="Una pequeña descripción de la problemática"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Input type="file" className="file-admin" inputProps={{accept:"image/*"}} id="image5" onChange={this.uploadImage} />
          <hr className="hr-admin" style={{visibility: "hidden"}} />
          <Button variant="success" onClick={this.update}>
            Subir cambios
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Problematic;
