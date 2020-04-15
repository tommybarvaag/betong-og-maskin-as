import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Facebook } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Copyright from "./copyright";
import GoogleMap from "./googleMap";
import ContactForm from "./contactForm";
import Link from "./link";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.bomColors.black,
    color: theme.palette.bomColors.yellow,
    marginTop: props => (props?.showGoogleMaps ? 0 : theme.spacing(8)),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  },
  gridHeader: {
    color: theme.palette.bomColors.yellow
  },
  footerTextContent: {
    color: theme.palette.common.white
  },
  footerLink: {
    color: theme.palette.common.white,
    fontSize: "1rem"
  },
  footerIcon: {
    color: theme.palette.common.white,
    fontSize: "2.4rem"
  }
}));

export default function Footer(props) {
  const { settings } = props;

  const classes = useStyles();

  function renderContactForm() {
    if (props?.showContactForm ?? false) {
      return <ContactForm />;
    }

    return null;
  }

  function renderGoogleMaps() {
    if (props?.showGoogleMaps ?? false) {
      return <GoogleMap latitude={settings?.latitude} longitude={settings?.longitude} />;
    }

    return null;
  }

  return (
    <>
      {renderContactForm()}
      {renderGoogleMaps()}
      <Container component="footer" className={classes.footer} maxWidth={false}>
        <Container>
          <Grid container spacing={4} justify="space-evenly">
            <Grid item xs={12} sm={3}>
              <Typography className={classes.gridHeader} variant="h6" gutterBottom>
                Kontakt oss
              </Typography>
              <Typography
                className={classes.footerTextContent}
                variant="body1"
                color="textSecondary"
                paragraph
                gutterBottom
              >
                Betong & Maskin AS
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography className={classes.gridHeader} variant="h6" gutterBottom>
                Linker
              </Typography>
              <ul>
                {settings &&
                  settings?.footerLinks &&
                  settings?.footerLinks.map((footerLink, index) => (
                    <li key={footerLink.name}>
                      <Link
                        className={classes.footerLink}
                        href={footerLink?.url ?? "/"}
                        variant="subtitle1"
                        color="textSecondary"
                      >
                        {footerLink.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography className={classes.gridHeader} variant="h6" gutterBottom>
                Følg oss
              </Typography>
              <ul>
                {settings &&
                  settings?.socialMediaItems &&
                  settings?.socialMediaItems.map((socialMediaItem, index) => (
                    <li key={socialMediaItem.icon}>
                      <a
                        className={classes.footerLink}
                        href={socialMediaItem.link?.url ?? "/"}
                        variant="subtitle1"
                      >
                        <Facebook className={classes.footerIcon} />
                      </a>
                    </li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </Container>
    </>
  );
}
