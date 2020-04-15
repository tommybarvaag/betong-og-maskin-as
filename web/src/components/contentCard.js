import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import Link from "./link";
import Image from "./image";

const useStyles = makeStyles(theme => ({
  card: {}
}));

export default function ContentCard(props) {
  const { title, text, image, link } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Link link={link}>
        <Image alt={image?.alt} url={image?.asset} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          {link && link.url && (
            <Button variant="text" size="medium" color="primary">
              Les mer
            </Button>
          )}
        </CardActions>
      </Link>
    </Card>
  );
}

ContentCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.shape({
    asset: PropTypes.object,
    alt: PropTypes.string
  }),
  link: PropTypes.object
};
