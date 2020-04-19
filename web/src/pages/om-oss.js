import React from "react";
import Layout from "../components/layout";
import { getPage } from "../lib/sanity/api";

export default function About(props) {
  const { page, settings, info } = props;

  return <Layout page={page} settings={settings} info={info}></Layout>;
}

export async function getStaticProps({ preview = false }) {
  const home = await getPage("about", preview);

  return {
    unstable_revalidate: 8,
    props: { ...home }
  };
}
