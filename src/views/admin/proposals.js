import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../components/sidebar";
import * as firebase from "firebase";

class Proposals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ready: false,
      proObject: {}
    };
  }

  componentDidMount() {
    const currentyId = this.props.match.params.id;
    var database = firebase.database().ref();
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
      .then(async data => {
        if (data.toJSON()) {
          await this.setState({ proObject: data.toJSON() });
        } else {
          this.setState({ nodata: true });
        }
        this.setState({ ready: true });
      });
  }

  delete = e => {
    const proId = e.target.id;
    const currentyId = this.props.match.params.id;
    var database = firebase.database().ref();
    database
      .child("proposals")
      .child(currentyId)
      .child(proId)
      .set({})
      .then(() => {
        window.location.reload();
      });
  };

  render() {
    const { name, ready, proObject, nodata } = this.state;
    const deletePro = this.delete;
    return (
      <Row>
        <Col sm="auto">
          <Sidebar url="/admin/proposals/" />
        </Col>
        <Col>
          <center>
            <h1>Administra las propuestas de {name}</h1>
            {ready ? (
              <div>
                {nodata ? (
                  <div>
                    <br />
                    <br />
                    <h3>No hay propuestas para {name}</h3>
                  </div>
                ) : (
                  <div>
                    {Object.keys(proObject).map(function(key, index) {
                      console.log(index);
                      return (
                        <div key={index}>
                          <Card>
                            <Card.Body>
                              <Card.Title>{proObject[key].title}</Card.Title>
                              <Card.Text>{proObject[key].body}</Card.Text>
                            </Card.Body>
                            <button id={key} onClick={e => deletePro(e)}>
                              Eliminar
                            </button>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <h3>Cargando...</h3>
            )}
          </center>
        </Col>
      </Row>
    );
  }
}

export default Proposals;
