import React, { Component } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import Input from "@material-ui/core/Input";
import * as firebase from "firebase";

class Proposals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      name: ""
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
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  notSubmit(e) {
    e.preventDefault();
  }

  update = () => {
    const currentyId = this.props.match.params.id;
    const userId = localStorage.getItem("userId");
    const proposalId = userId + new Date().getTime().toString();
    const { title, body } = this.state;
    var database = firebase.database().ref();
    database
      .child("proposals")
      .child(currentyId)
      .child(proposalId)
      .update({
        own: userId,
        title,
        body
      })
      .then(() => {
        console.log("Subido");
      });
    window.location.pathname = "/problematics/" + currentyId;
  };

  render() {
    return (
      <Container>
        <br />
        <Form onSubmit={e => this.notSubmit(e)}>
          <Card.Title style={{ display: "inline" }}>
            Dános una solución a la problematica de{" "}
          </Card.Title>
          <Card.Title style={{ display: "inline" }}>
            {this.state.name === "" ? "..." : <b>{this.state.name}</b>}
          </Card.Title>
          <br />
          <br />
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              id="title"
              defaultValue={this.state.title}
              placeholder="Título de tu solución"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              id="body"
              value={this.state.body}
              placeholder="Una pequeña descripción de tu solución"
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Input
            type="file"
            className="file-admin"
            inputProps={{ accept: "image/*" }}
            id="image5"
            onChange={this.uploadImage}
          />
          <hr className="hr-admin" style={{ visibility: "hidden" }} />
          <Button variant="success" onClick={this.update}>
            Subir cambios
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Proposals;
