import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(theme => ({
  figure: {
    margin: theme.spacing(2, 0),
    padding: 0
  },
  caption: {}
}));

export default function Figure(props) {
  const { image } = props;

  const classes = useStyles();

  if (!image?.asset) {
    return null;
  }

  return (
    <figure className={classes.figure}>
      <Image image={image} width={1280} phoneWidth={600} />
      <figcaption className={classes.caption}>{props.caption}</figcaption>
    </figure>
  );
}
