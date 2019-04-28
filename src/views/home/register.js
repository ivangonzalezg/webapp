import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import Loading from "../../components/loading";
import * as firebase from "firebase";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      rpassword: "",
      message: "",
      socialId: 0,
      name: "",
      location: "",
      loading: false,
      socialsId: []
    };
  }

  componentDidMount() {
    const users = firebase
      .database()
      .ref()
      .child("users");
    users.once("value").then(usersInfo => {
      usersInfo.forEach(userInfo => {
        const id = userInfo.toJSON().socialId;
        this.setState(prevState => ({
          socialsId: [...prevState.socialsId, id]
        }));
      });
    });
  }

  register = e => {
    e.preventDefault();
    const {
      email,
      password,
      rpassword,
      name,
      socialId,
      location,
      socialsId
    } = this.state;
    if (socialId.toString().length < 7) {
      this.setState({ message: "Número de cédula invalido" });
      return;
    }
    if (socialsId !== []) {
      for (let index = 0; index < socialsId.length; index++) {
        if (socialsId[index] === socialId.toString()) {
          this.setState({ message: "Número de cédula registrado" });
          return;
        }
      }
    }
    if (password === rpassword) {
      this.setState({ message: "", loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(event => {
          localStorage.setItem("userId", event.user.uid);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userName", name);
          localStorage.setItem("userLocation", location);
          localStorage.setItem("userSocialId", socialId);
          const user = firebase
            .database()
            .ref()
            .child("users")
            .child(event.user.uid);
          user
            .set({
              email,
              name,
              socialId,
              location
            })
            .then(() => {
              window.location.pathname = "/newuser";
              this.setState({ loading: false });
            });
        })
        .catch(error => {
          this.setState({ loading: false });
          if (error.code === "auth/weak-password") {
            this.setState({
              message: "Contraseña debil (Mínimo 6 caracteres)"
            });
          } else if (error.code === "auth/email-already-in-use") {
            this.setState({ message: "Email en uso. Inicie sesión" });
          } else if (error.code === "auth/invalid-email") {
            this.setState({ message: "Formato de email incorrecto" });
          } else if (error.code === "auth/network-request-failed") {
            this.setState({ message: "Revise su conexión a internet" });
          } else {
            this.setState({ message: error.message });
          }
        });
    } else {
      this.setState({ message: "Contraseñas no coinciden" });
    }
  };

  render() {
    return (
      <Container>
        <br />
        <h1>
          <center>Crea tu cuenta</center>
          <br />
        </h1>
        <div id="form-user">
          <Form onSubmit={!this.state.loading ? e => this.register(e) : null}>
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
            <Form.Group>
              <Form.Label>Repita contraseña</Form.Label>
              <Form.Control
                type="password"
                onChange={event =>
                  this.setState({ rpassword: event.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                onChange={event => this.setState({ name: event.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>N° de Cédula</Form.Label>
              <Form.Control
                type="number"
                minLength="8"
                onChange={event =>
                  this.setState({ socialId: event.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Seleccione su localidad</Form.Label>
              <Form.Control
                required
                as="select"
                onChange={event =>
                  this.setState({ location: event.target.value })
                }
              >
                <option />
                <option>Metropolitana</option>
                <option>Norte-Centro Histórico</option>
                <option>Riomar</option>
                <option>Sur Occidente</option>
                <option>Sur Oriente</option>
              </Form.Control>
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

export default Register;
