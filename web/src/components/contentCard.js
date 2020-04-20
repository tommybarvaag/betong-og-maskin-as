import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import ConditionalWrapper from "./conditionalWrapper";
import Image from "./image";
import Link from "./link";

const useStyles = makeStyles(theme => ({
  card: {}
}));

export default function ContentCard(props) {
  const { title, text, image, href } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <ConditionalWrapper
        condition={href !== null && href !== undefined}
        wrapper={children => <Link href={href}>{children}</Link>}
      >
        <Image image={image} width={400} height={500} quality={75} fit="crop" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          {href !== null && href !== undefined && (
            <Button variant="text" size="medium" color="primary">
              Les mer
            </Button>
          )}
        </CardActions>
      </ConditionalWrapper>
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
