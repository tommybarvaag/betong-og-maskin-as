import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Image from "./image";

const validImage = image => image !== null && image !== undefined;

const useStyles = makeStyles(theme => ({
  hero: {
    position: "relative",
    padding: 0,
    lineHeight: 0,
    "&::before": {
      content: "''",
      position: "absolute",
      background: "#000",
      opacity: ".5",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  },
  heroImage: {
    [theme.breakpoints.up("sm")]: {
      height: "500px",
      objectFit: "cover",
      objectPosition: "right"
    }
  },
  heroContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  heroTitle: {
    color: props => (validImage(props?.image) ? "#fff" : "#000")
  },
  heroText: {
    color: props => (validImage(props?.image) ? "#fff" : "#000")
  }
}));

export default function Hero(props) {
  const classes = useStyles(props);
  const { title, text, image } = props;

  return (
    <Container component="section" className={classes.hero} maxWidth={false}>
      {validImage(image) && (
        <Image
          className={classes.heroImage}
          image={image}
          width={1920}
          height={500}
          phoneWidth={600}
          phoneHeight={600}
          fit="crop"
        />
      )}
      <Container className={classes.heroContent} maxWidth="lg">
        <Container maxWidth="lg">
          <Typography
            component="h1"
            className={classes.heroTitle}
            variant="h1"
            align="left"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h5" className={classes.heroText} align="left" component="p">
            {"Hi"}
          </Typography>
        </Container>
      </Container>
    </Container>
  );
}
