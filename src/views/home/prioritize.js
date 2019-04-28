import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import * as firebase from "firebase";
import Loading from ".././../components/loading";
import ArrowDown from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUp from "@material-ui/icons/ArrowUpwardRounded";

class Prioritize extends Component {
  constructor() {
    super();

    this.state = {
      status: false
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

  handleChangeUp(e) {
    const id = parseInt(e.target.id);
    const temp = this.state["name" + id];
    const tempNext = this.state["name" + (id - 1)];
    this.setState({
      ["name" + id]: tempNext,
      ["name" + (id - 1)]: temp
    });
  }

  handleChangeDown(e) {
    const id = parseInt(e.target.id);
    const temp = this.state["name" + id];
    const tempNext = this.state["name" + (id + 1)];
    this.setState({
      ["name" + id]: tempNext,
      ["name" + (id + 1)]: temp
    });
  }

  render() {
    var { name1, name2, name3, name4, name5 } = this.state;
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
            <Alert variant="danger">
              {name1}
              <ArrowDown
                id="1"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeDown(e);
                }}
              />
            </Alert>
            <Alert variant="warning">
              {name2}
              <ArrowUp
                id="2"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeUp(e);
                }}
              />
              <ArrowDown
                id="2"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeDown(e);
                }}
              />
            </Alert>
            <Alert variant="warning">
              {name3}
              <ArrowUp
                id="3"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeUp(e);
                }}
              />
              <ArrowDown
                id="3"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeDown(e);
                }}
              />
            </Alert>
            <Alert variant="primary">
              {name4}
              <ArrowUp
                id="4"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeUp(e);
                }}
              />
              <ArrowDown
                id="4"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeDown(e);
                }}
              />
            </Alert>
            <Alert variant="success">
              {name5}
              <ArrowUp
                id="5"
                className="arrow-survey"
                onClick={e => {
                  this.handleChangeUp(e);
                }}
              />
            </Alert>
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
