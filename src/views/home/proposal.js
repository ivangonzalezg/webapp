import React, { Component } from "react";
import * as firebase from "firebase";
import { Container } from "react-bootstrap";

class Proposal extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    const currentyId = this.props.match.params.id;
    const proposalKey = this.props.match.params.reference;
    var database = firebase.database().ref();
    database
      .child("proposals")
      .child(currentyId)
      .child(proposalKey)
      .once("value")
      .then(async proposal => {
        await this.setState(proposal.toJSON());
        this.setState({ isLoaded: true });
      });
  }
  render() {
    const { isLoaded, title, body } = this.state;
    return (
      <Container>
        <br />
        {isLoaded ? (
          <div>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
        ) : null}
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Ver state
        </button>
      </Container>
    );
  }
}

export default Proposal;
