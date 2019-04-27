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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  const { info } = props;  
  return (
    <Card className={classes.card}>
    <a href={"/"+info.name.toLowerCase()}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={info.image}
          title={info.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {info.name}
          </Typography>
          <Typography component="p">
            {info.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      </a>
      <CardActions>
        <Button size="small" color="primary">
          Compartir
        </Button>
        <Button size="small" color="primary">
          Saber más
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
