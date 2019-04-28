import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbDownOutlined from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import QuestionAnswerOutlined from '@material-ui/icons/QuestionAnswerOutlined';


const styles = {
  card: {
    maxWidth: 1000,
  },
  media: {
    height: 40,
  },
};

function MediaCard(props) {
  var state = {
    like: true
  }
  const { classes } = props;
  const { info } = props;
  const link = "/problematics/2/" + info.id;
  return (
    <Card className={classes.card}>
      <a href={link}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={info.image ? info.image : "https://ep01.epimg.net/internacional/imagenes/2018/07/23/billete_a_macondo/1532310440_143390_1532310884_noticia_normal_recorte1.jpg"}
            title={info.title}
          />
          <CardContent className="CardContent-problematics">
            <Typography component="p">
              {info.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <CardActions>
        <a href={link}>
          <Button size="small" color="primary">
            <QuestionAnswerOutlined />
          </Button>
        </a>
        <Button size="small" color="primary">
        {state.like ? <ThumbUpOutlined /> : <ThumbUp />}
        </Button>
        <Button size="small" color="primary" onClick={function () { state.like = !state.like }}>
          {state.like ? <ThumbDownOutlined /> : <ThumbDown />}
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
