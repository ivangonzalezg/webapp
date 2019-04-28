import React from 'react';
import * as firebase from "firebase";
import { Container, Form, Col, Row, Image } from "react-bootstrap";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        info: this.props.info,
        body: "",
        currentyId : this.props.currentyId
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

    render() {
        console.log("render", this.state.info)
        var comments = this.state.info.comments.map((dato, i) => {
            return (
                <Row key={i} className="row-comments">
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
        })
        return (
            <div className="classes-root">
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button size="small" color="primary">
                                        <QuestionAnswerOutlined />
                                    </Button>
                                    <Button size="small" color="primary">
                                        {this.state.like ? <ThumbUpOutlined /> : <ThumbUp />}
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => { this.setState({ like: !this.state.like }) }}>
                                        {this.state.like ? (
                                            <ThumbDownOutlined />
                                        ) : (
                                            <ThumbDown />
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="classes-details">
                        <Container>
                            {comments}
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
                        </Container>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" color="primary" >
                            Guardar
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}

export default DetailedExpansionPanel;
