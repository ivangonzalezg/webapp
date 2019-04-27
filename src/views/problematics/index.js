import React, { Component } from "react";

class Problematics extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.setState({
      currentyId: this.props.match.params.id
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.currentyId}</p>
      </div>
    );
  }
}

export default Problematics;
