import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import ContentCard from "../components/contentCard";
import Layout from "../components/layout";
import { getPage } from "../lib/sanity/api";

const useStyles = makeStyles(theme => ({
  services: {
    margin: theme.spacing(10, "auto")
  }
}));

export default function Home(props) {
  const { page, settings, info, services } = props;
  const classes = useStyles();

  function renderServices() {
    if (services?.length > 0) {
      return (
        <Container className={classes.services}>
          <Grid container spacing={4} {...props}>
            {services.map(service => (
              <Grid item key={service.title} xs={12} sm={12 / services.length}>
                <ContentCard
                  title={service?.title}
                  text={"Text"}
                  image={service?.mainImage}
                  // href={service?.slug?.current ?? "/"}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }

    return null;
  }

  return (
    <Layout page={page} settings={settings} info={info}>
      {renderServices()}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = await getPage("home", preview);

  return {
    unstable_revalidate: 8,
    props: { ...home }
  };
}
