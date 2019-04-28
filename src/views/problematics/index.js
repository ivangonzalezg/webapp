import React, { Component } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import * as firebase from "firebase";
import Button from '@material-ui/core/Button';
import PlayCircleOutlined from '@material-ui/icons/PlayCircleOutline';


class Problematics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentyId: Number,
            data: [],
            key : null
        };
    }
    componentWillMount() {
        var database = firebase.database().ref();
        const currentyId = this.props.match.params.id;
        database
            .child("proposals")
            .child(currentyId.toString())
            .once("value")
            .then(data => {
                var datos = [];
                const dbinfo = data.toJSON();
                data.forEach(value => {
                    datos.push(value.val());
                });
                var i = 0;
                for (var key in dbinfo) {
                    datos[i].id = key;
                    i = +1;
                }
                this.setState({
                    data: datos,
                    currentyId
                });
            });
    }

    render() {
        var card = this.state.data.map((dato, i) => {
            return (
                <div key={i}>
                    <Target info={dato} currentyId={this.state.currentyId}/>
                </div>
            );
        });
        return (
            <div>
                <Container>
                    <Row>
                        <h1>Propuestas para mejorar la {this.state.name}</h1>
                    </Row>
                    <Row>
                        <Button
                            color="danger"
                            size="lg"
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PlayCircleOutlined />
                            Watch video
                        </Button>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col>{card}</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Problematics;
