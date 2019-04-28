import React, { Component } from "react";
import { Container, Col } from 'react-bootstrap';
import Target from './Card';
import * as firebase from "firebase"

class Problematics extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentyId : Number,
            data: [{}]
        };
    }
    componentDidMount() {
        this.setState({
            currentyId: this.props.match.params.id
        });

        var database = firebase.database().ref();
        database
            .child("proposals")
            .child(this.props.match.params.id.toString())
            .once("value")
            .then(data => {
                var datos = [];
                data.forEach(value => {
                    datos.push(value.val())
                })
                this.setState({
                    data : datos
                })
            });
    }

    render() {
        var card = this.state.data.map((dato, i) => {
            return (
                <div>
                    <Target info={dato} className="problemCards"/>
                </div>
            )
          })
        return (
            <div>
                <Container>
                    <Col >
                        {card}
                    </Col>
                </Container>
            </div>
        );
    }
}

export default Problematics;
