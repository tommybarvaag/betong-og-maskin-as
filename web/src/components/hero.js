import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  hero: { width: "100%", margin: "0 auto" },
  title: {
    width: "100%",
    paddingTop: "80px",
    textAlign: "center",
    margin: theme.spacing(0, 0, 2)
  },
  description: {
    textAlign: "center"
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.hero}>
      <Typography variant="h1" className={classes.title} gutterBottom>
        Betong & Maskin AS
      </Typography>
      <Typography className={classes.description} paragraph>
        Vi lager betong!
      </Typography>
    </Container>
  );
}
