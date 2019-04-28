import React from 'react';
import * as firebase from "firebase";
import { Container, Form, Col, Row, Image, Accordion } from "react-bootstrap";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ThumbDownOutlined from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import QuestionAnswerOutlined from '@material-ui/icons/QuestionAnswerOutlined';


class DetailedExpansionPanel extends React.Component {
    state = {
        like: true,
        dislike: true,
        info: this.props.info,
        body: "",
        currentyId: this.props.currentyId
    }
    update = () => {
        var database = firebase.database().ref();
        const date = new Date().getTime();
        const { body } = this.state;
        const userId = localStorage.getItem("userId");
        const tempObject = { [date]: { body, userId } };
        database
            .child("proposals")
            .child(this.state.currentyId)
            .update(tempObject)
    };
    onClick(k) {
        if (k) { console.log("onclick2") }
    }
    onClickActions(k) {
        if (k) {
            if (this.state.like !== this.state.dislike) {
                this.setState({
                    like: !this.state.like
                })
            }
            this.setState({
                dislike: !this.state.dislike
            })
        } else {
            if (this.state.dislike !== this.state.like) {
                this.setState({
                    dislike: !this.state.dislike
                })
            }
            this.setState({
                like: !this.state.like
            })
        }
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default DetailedExpansionPanel;

/*

<Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <Container>
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <Image width="180px" src={this.state.info.image ? this.state.info.image : "https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal_recorte1.jpg"} rounded />
                                        </Col>
                                        <Col>
                                            <Row>
                                                <h1>
                                                    {this.state.info.title}
                                                </h1>
                                            </Row>
                                            <Row>
                                                {this.state.info.body}
                                            </Row>
                                            <Row>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col>
                                                    <QuestionAnswerOutlined />
                                                </Col><Col>
                                                    {this.state.dislike ? <ThumbUpOutlined /> : <ThumbUp />}
                                                </Col><Col>
                                                    {this.state.like ? <ThumbDownOutlined /> : <ThumbDown />}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Container>
                                    {this.state.info.comments ?
                                        this.state.info.comments.map((dato, i) => {
                                            return (
                                                <Row key={i} className="row-comments">
                                                    <Divider />
                                                    <Col>
                                                        {dato.user}
                                                    </Col>
                                                    <Col className="classes-column classes-helper">
                                                        <Typography variant="caption">
                                                            {dato.body}
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                            )
                                        }) : null}
                                    <Row className="row-comments">
                                        <Form.Label>Comentar</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={event =>
                                                this.setState({ body: event.target.value })
                                            }
                                            required
                                        />
                                    </Row>
                                    <Button size="small" color="primary" onClick={this.onClick(true)} >
                                        Guardar
                                </Button>
                                </Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

*/