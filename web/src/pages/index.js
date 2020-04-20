import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as React from "react";
import BlockText from "../components/blockText";
import ContentCard from "../components/contentCard";
import Layout from "../components/layout";
import { getPage } from "../lib/sanity/api";

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(10, "auto")
  }
}));

export default function Home(props) {
  const { page, settings, info, services } = props;
  const classes = useStyles();

  function renderServices() {
    if (services?.length > 0) {
      return (
        <Grid container spacing={4}>
          {services.map(service => (
            <Grid item key={service.title} xs={12} sm={12 / services.length}>
              <ContentCard
                title={service?.title}
                image={service?.mainImage}
                // href={service?.slug?.current ?? "/"}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return null;
  }

  return (
    <Layout page={page} settings={settings} info={info}>
      <Container className={classes.container}>
        <BlockText blocks={page?.text} />
        {renderServices()}
      </Container>
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
