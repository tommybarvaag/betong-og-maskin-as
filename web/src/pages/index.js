import { Container, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Head from "next/head";
import React from "react";
import ContactForm from "../components/contactForm";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Nav from "../components/nav";
import { getHome } from "../lib/sanity/api";

const settings = {
  rootLink: {
    name: "Betong & Maskin AS",
    url: "/"
  },
  culture: "",
  menuItems: [
    {
      name: "Om oss",
      url: "/om-oss/",
      level: 2,
      link: {
        name: "Om oss",
        url: "/om-oss/"
      },
      children: null
    },
    {
      name: "Kontakt oss",
      url: "/kontakt/",
      level: 2,
      link: {
        name: "Kontakt oss",
        url: "/kontakt/"
      },
      children: null
    }
  ],
  footerLinks: [
    {
      name: "Om oss",
      url: "/om-oss/"
    },
    {
      name: "Kontakt",
      url: "/kontakt/"
    }
  ],
  socialMediaItems: [
    {
      link: {
        name: "https://www.facebook.com/",
        target: "_blank",
        type: 2,
        udi: null,
        url: "https://www.facebook.com/"
      },
      icon: "Facebook"
    }
  ],
  email: "post@betongogmaskin.no",
  phone: "+4799887766",
  address: "Vågenesvegen 132",
  zipCode: 5936,
  city: "Manger",
  latitude: 60.675033,
  longitude: 4.943742,
  companyName: "Betong & Maskin AS",
  legalName: "Betong & Maskin AS",
  logoUrl: "/media/4o1hvgc3/logo.png",
  region: null,
  country: null,
  contactType: "Customer support",
  sameAs: ["https://www.facebook.com"]
};

const useStyles = makeStyles(theme => ({
  main: {
    position: "relative"
  }
}));

export default function Home(props) {
  const { page, info, services } = props;

  const classes = useStyles();

  return (
    <>
      <Head>
        <title lang="en">{page?.title}</title>
        <meta name="description" content={page?.metaDescription ?? "Meta desc"}></meta>
        <link rel="canonical" href="/"></link>
        <meta property="og:title" content={page?.title}></meta>
        <meta property="og:description" content={page?.metaDescription ?? "Meta desc"}></meta>
        <meta property="og:url" content="/"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:image" content="/logo.jpg"></meta>
        <meta property="og:locale" content="nb_NO"></meta>
        <meta property="og:site_name" content={info?.name}></meta>
        <script type="application/ld+json">{`"@context": "https://schema.org",
            "@type": "Organization",
            "name": "${info?.name}",
            "legalName": "${info?.name}",
            "url": "https://betongogmaskin.no/",
            "logo": "https://betongogmaskin.no/logo.jpg",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "${info?.address1}",
                "addressRegion": "${info?.city}",
                "postalCode": "${info?.zipCode}",
                "addressCountry": "${info?.country}"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales and support",
                "telephone": "${info?.phone}",
                "email": "${info?.email}"
            },
            "sameAs": ["https://www.facebook.com/betongogmaskin","https://www.linkedin.com/in/betongogmaskin/"]`}</script>
      </Head>
      <Nav settings={settings} />
      <Hero />
      <ContactForm />
      <Footer settings={settings} />
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = await getHome(preview);

  return {
    props: { ...home }
  };
}
