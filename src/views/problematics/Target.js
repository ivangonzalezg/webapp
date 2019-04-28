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
        like: false,
        numLike : Number,
        userName : false,
        dislike: true,
        numDislike : Number,
        info: this.props.info,
        comments : false,
        body: "",
        proposalId : this.props.info.id,
        currentyId: this.props.currentyId
    }
    componentWillMount(){
        const userName = localStorage.getItem("userId");
        this.setState({
            userName,
            numLike : this.props.info.actions.like,
            numDislike : this.props.info.actions.dislike,
        })
        console.log("info: ",this.props.info.actions.like)
        if(this.props.info.comments){
            const comments = this.props.info.comments;
            const datos = [{}];
            var i = 0;
            for (var key in comments) {
                for (var key1 in comments[key]) {
                    datos[i] = {name:key1, date: key, body:comments[key][key1] }
                }
                i += 1;
            }
            this.setState({
                comments: datos
            });
            console.log("datos:  ", datos)
        }
    }
    update = () => {
        var database = firebase.database().ref();
        const date = new Date().getTime();
        const { body } = this.state;
        const name = localStorage.getItem("userName");
        const tempObject = {[date]:{[name]:body}};
        const actions = {like:this.state.like};
        console.log("database: ",this.state.proposalId)
        database
            .child("proposals")
            .child(this.state.currentyId)
            .child(this.state.proposalId)
            .child("comments")
            .update(tempObject)
        database
            .child("proposals")
            .child(this.state.currentyId)
            .child(this.state.proposalId)
            .child("actions")
            .update(actions)

        this.state.comments.push({name:name, date:date, body:body})
        this.setState({});
    };
    onClick(k) {
        if(this.state.userName){
            this.update();
        }else{
            window.location.pathname = "/login";
        }
    }
    onClickActions(k){
        if(this.state.userName){
            if(k){
                if(this.state.like !== this.state.dislike){
                    this.setState({ 
                        like: this.state.dislike,
                    })
                } 
                this.setState({ 
                    dislike: !this.state.dislike 
                })                                  
            }else{
                if(this.state.dislike !== this.state.like ){
                    this.setState({ 
                        dislike: this.state.like ,
                    })
                }
                this.setState({ 
                    like: !this.state.like,
                }
            )}            
        }else{
            window.location.pathname = "/login";
        }
    }

    render() {
        return (
            <div className="classes-root">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Container>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Image width="180px" src={this.state.info.url ? this.state.info.url : "https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal_recorte1.jpg"} rounded />
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
                                            {this.state.numDislike} {this.state.dislike ? <ThumbUpOutlined /> : <ThumbUp />}
                                        </Col><Col>
                                            {this.state.numLike}{this.state.like ? <ThumbDownOutlined /> : <ThumbDown />}                                            
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </ExpansionPanelSummary>
                    <Container>
                        <Row>
                            <Col>
                                <Button size="small" color="primary" onClick={() => { this.onClickActions(true) }}>
                                    {this.state.numDislike}{this.state.dislike ? <ThumbUpOutlined /> : <ThumbUp />}
                                </Button>
                                <Button size="small" color="primary" onClick={() => { this.onClickActions(false) }}>
                                    {this.state.numLike}{this.state.like ? <ThumbDownOutlined /> : <ThumbDown />}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <ExpansionPanelDetails className="classes-details">
                        <Container>
                            {this.state.comments ?
                                this.state.comments.map((dato, i) => {
                                    return (
                                        <Row key={i} className="row-comments">
                                            <Divider />
                                            <Col>
                                                {dato.name}
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
                        </Container>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button size="small" color="primary" onClick={() => this.onClick(true)} >
                            Guardar
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <Divider />
            </div>
        );
    }
}

export default DetailedExpansionPanel;
