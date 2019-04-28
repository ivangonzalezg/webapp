import React, { Component } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import * as firebase from "firebase";

class Problematics extends Component {
  constructor() {
    super();

    this.state = {
      searching: true
    };
  }

  componentWillMount() {
    var database = firebase.database().ref();
    const currentyId = this.props.match.params.id;
    const link = "/problematics/create/" + currentyId;
    this.setState({ currentyId, link });
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        this.setState({ name: dbinfo["name" + currentyId] });
      });
    database
      .child("proposals")
      .child(currentyId)
      .once("value")
      .then(value => {
        const ObjectVal = value.toJSON();
        if (ObjectVal) {
          this.setState({ data: ObjectVal });
        } else {
          this.setState({ nodata: true });
        }
        this.setState({ searching: false });
      });
  }

  render() {
    const isSearching = this.state.searching;
    var { data, currentyId, nodata } = this.state;
    return (
      <Container>
        <h1>Propuestas para mejorar la {this.state.name}</h1>
        <br />
        <Button variant="success" href={this.state.link}>Haz una propuesta</Button>
        <br />
        <br />
        <br />
        {isSearching ? null : (
          <div>
            {nodata ? (
              <div>
                <h3>
                  No hay propuestas para esta temática, postula una y sé el
                  primero.
                </h3>
              </div>
            ) : (
              <div>
                {Object.keys(data).map(function(key, index) {
                  return (
                    <div style={{ display: "inline", width: "100%" }}>
                      <Card>
                        <Row>
                          <Col>
                            <Card.Body>
                              <Card.Title>{data[key].title}</Card.Title>
                              <Card.Text>{data[key].body}</Card.Text>
                              <Button
                                href={"/problematics/" + currentyId + "/" + key}
                              >
                                Vota o comenta por esta propuesta
                              </Button>
                            </Card.Body>
                          </Col>
                          <Col>
                            {data[key].url && (
                              <img
                                width="300px"
                                alt={data[key].title}
                                src={data[key].url}
                              />
                            )}
                          </Col>
                        </Row>
                      </Card>
                      <br />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Container>
    );
  }
}

export default Problematics;
