import Head from "next/head";
import React from "react";
import { imageBuilder } from "../lib/sanity/api";
import Footer from "./footer";
import Hero from "./hero";
import Nav from "./nav";
import Parallax from "./parallax";

export default function Layout(props) {
  const { page, settings, info, children } = props;

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
      <Nav page={page} settings={settings} info={info} />
      <Hero title={page?.title} text={page?.text} image={page?.image} />
      {children}
      <Parallax
        bgImage={imageBuilder
          .image("image-8b2b9244349ad7755cd6ee6cc0cd5c3fc215702a-5760x3840-jpg")
          .width(1920)
          .height(1000)
          .format("webp")
          .quality(90)
          .url()}
        strength={500}
      >
        <div style={{ height: 500 }}>
          <div
            style={{
              background: "white",
              padding: 20,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
          >
            {"Hi"}
          </div>
        </div>
      </Parallax>
      <Footer page={page} settings={settings} info={info} />
    </>
  );
}
