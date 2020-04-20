import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(theme => ({
  copyrightTypography: {
    margin: theme.spacing(10, 0, 0)
  },
  builtWithTypography: {
    fontSize: "1rem",
    color: theme.palette.common.white,
    margin: theme.spacing(2, 0, 0)
  },
  builtWithTypographyLink: {
    color: theme.palette.common.white
  }
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.copyrightTypography} align="center">
        {"Copyright © Betong & Maskin AS "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography className={classes.builtWithTypography} align="center">
        {"Built with "}
        <Link className={classes.builtWithTypographyLink} href="https://nextjs.org/">
          Next.js
        </Link>
        {" by ZEIT and "}
        <Link className={classes.builtWithTypographyLink} href="https://www.sanity.io/">
          Sanity
        </Link>
        {". Hosted on "}
        <Link className={classes.builtWithTypographyLink} href="https://zeit.co/">
          ZEIT
        </Link>
        {" with source code at "}
        <Link
          className={classes.builtWithTypographyLink}
          href="https://github.com/tommylb/betong-og-maskin-as"
        >
          GitHub
        </Link>
        {"."}
      </Typography>
    </>
  );
}
