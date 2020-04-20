import Container from "@material-ui/core/Container";
import * as React from "react";
import BlockText from "../components/blockText";
import Layout from "../components/layout";
import { getPage } from "../lib/sanity/api";

export default function About(props) {
  const { preview, page, settings, info } = props;

  return (
    <Layout preview={preview} page={page} settings={settings} info={info}>
      <Container>
        <BlockText blocks={page?.text} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const about = await getPage("about", preview);

  return {
    unstable_revalidate: 3600,
    props: { ...about, preview }
  };
}
