import React from 'react';
import Target from './Card';
import { Container, Col, Row } from 'react-bootstrap'
import '../../App.css';
import * as firebase from "firebase"


class Home extends React.Component {



    constructor(props) {
        super(props)

        this.state = {
            name1: "",
            name2: "",
            name3: "",
            name4: "",
            name5: "",
            description1: "",
            description2: "",
            description3: "",
            description4: "",
            description5: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: ""
        };
    }
    componentDidMount() {

        var database = firebase.database().ref();
        database
            .child("problems")
            .once("value")
            .then(data => {
                const dbinfo = data.toJSON();
                for (let index = 1; index < 6; index++) {
                    this.setState({
                        ["name" + index]: dbinfo["name" + index],
                        ["description" + index]: dbinfo["description" + index],
                        ["image" + index]: dbinfo["image" + index]
                    });
                }
            });
    }

    render() {

        var {name1,name2,name3,name4,name5 } = this.state;
        var {description1,description2,description3,description4,description5 } = this.state;
        var {image1,image2,image3,image4,image5 } = this.state;
        return (
            <div>
                <Container className="conta">
                    <Row>
                        <Col><Target info={{ name: name1, description: description1, image: image1 }} /></Col>
                        <Col><Target info={{ name: name2, description: description2, image: image2 }} /></Col>
                        <Col><Target info={{ name: name3, description: description3, image: image3 }} /></Col>
                    </Row>
                    <Row>
                        <Col><Target info={{ name: name4, description: description4, image: image4 }} /></Col>
                        <Col><Target info={{ name: name5, description: description5, image: image5 }} /></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Home;