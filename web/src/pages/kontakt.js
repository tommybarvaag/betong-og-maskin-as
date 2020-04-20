import Container from "@material-ui/core/Container";
import * as React from "react";
import BlockText from "../components/blockText";
import Layout from "../components/layout";
import { getPage } from "../lib/sanity/api";

export default function Contact(props) {
  const { page, settings, info } = props;

  return (
    <Layout page={page} settings={settings} info={info}>
      <Container>
        <BlockText blocks={page?.text} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = await getPage("contact", preview);

  return {
    unstable_revalidate: 8,
    props: { ...home }
  };
}
