import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Facebook from "@material-ui/icons/Facebook";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Twitter from "@material-ui/icons/Twitter";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import ContactForm from "./contactForm";
import Copyright from "./copyright";
import GoogleMap from "./googleMap";
import Link from "./link";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.bomColors.black,
    color: theme.palette.bomColors.yellow,
    marginTop: props => (props?.page?.enableGoogleMaps ? 0 : theme.spacing(8)),
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
  },
  socialMedia: {
    display: "flex"
  }
}));

export default function Footer(props) {
  const { page, info } = props;

  const classes = useStyles(props);

  function renderContactForm() {
    if (page?.enableContactForm ?? false) {
      return <ContactForm />;
    }

    return null;
  }

  function renderGoogleMaps() {
    if (page?.enableGoogleMaps && info?.googleMapsLatitude && info?.googleMapsLongitude) {
      return (
        <GoogleMap latitude={info?.googleMapsLatitude} longitude={info?.googleMapsLongitude} />
      );
    }

    return null;
  }

  function renderSocialMediaIcon(socialMedia) {
    switch (socialMedia.type) {
      case "Facebook":
        return <Facebook className={classes.footerIcon} />;
      case "Twitter":
        return <Twitter className={classes.footerIcon} />;
      case "LinkedIn":
        return <LinkedIn className={classes.footerIcon} />;
      case "GitHub":
        return <GitHub className={classes.footerIcon} />;
      default:
        return <Facebook className={classes.footerIcon} />;
    }
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
                {info?.name}
              </Typography>
              <Typography
                className={classes.footerTextContent}
                variant="body1"
                color="textSecondary"
                paragraph
                gutterBottom
              >
                {`${info?.address1}, ${info?.zipCode} ${info?.city}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography className={classes.gridHeader} variant="h6" gutterBottom>
                Linker
              </Typography>
              <ul>
                {info &&
                  info?.footerLinks &&
                  info?.footerLinks.map((footerLink, index) => (
                    <li key={footerLink.name}>
                      <Link
                        className={classes.footerLink}
                        href={info?.url ?? "/"}
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
              <ul className={classes.socialMedia}>
                {info &&
                  info?.socialMedias &&
                  info?.socialMedias.map((socialMedia, index) => (
                    <li key={socialMedia.type}>
                      <a
                        className={classes.footerLink}
                        href={socialMedia?.url ?? "/"}
                        variant="subtitle1"
                      >
                        {renderSocialMediaIcon(socialMedia)}
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
