import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Loading from "../../components/loading";
import * as firebase from "firebase";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      message: "",
      loading: false
    };
  }

  login = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ message: "", show: false });
    if (password !== "") {
      this.setState({ message: "", loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(event => {
          const userInfo = firebase
            .database()
            .ref()
            .child("users")
            .child(event.user.uid);
          userInfo.once("value").then(data => {
            var objectData = data.toJSON();
            localStorage.setItem("userId", event.user.uid);
            localStorage.setItem("userEmail", objectData.email);
            localStorage.setItem("userName", objectData.name);
            console.log(objectData);
            this.setState({ loading: false });
          });
        })
        .catch(error => {
          this.setState({ loading: false, show: true });
          if (error.code === "auth/user-disabled") {
            this.setState({ message: "Cuenta suspendida" });
          } else if (error.code === "auth/network-request-failed") {
            this.setState({ message: "Revise su conexión a internet" });
          } else if (error.code === "auth/user-not-found") {
            this.setState({ message: "¡Usted no está registrado! Regístrese" });
          } else if (error.code === "auth/wrong-password") {
            this.setState({ message: "Contraseña incorrecta" });
          } else if (error.code === "auth/invalid-email") {
            this.setState({ message: "Ingrese su correo electrónico" });
          } else {
            this.setState({ message: error.message });
          }
        });
    } else {
      this.setState({ message: "Ingrese su contraseña", show: true });
    }
  };

  render() {
    return (
      <Container>
        <br />
        <h1>
          <center>Inicia sesión</center>
          <br />
        </h1>
        <div id="form-user">
          <Form onSubmit={!this.state.loading ? e => this.login(e) : null}>
            <Form.Label>Ingrese correo electrónico</Form.Label>
            <Form.Group controlId="email-barranquilla">
              <Form.Control
                type="email"
                onChange={event => this.setState({ email: event.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="password-barranquilla">
              <Form.Label>Ingrese contraseña</Form.Label>
              <Form.Control
                type="password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                required
              />
            </Form.Group>
            {this.state.loading ? (
              <center>
                <Loading width="30px" height="30px" />
              </center>
            ) : null}
            <center>
              <Form.Label>{this.state.message}</Form.Label>
              <br />
              <Button
                variant="success"
                type="submit"
                disabled={this.state.loading}
              >
                Registrarse
              </Button>
            </center>
          </Form>
        </div>
      </Container>
    );
  }
}

export default Login;
