import { Typography } from "@material-ui/core";
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
        <meta property="og:image" content="https://betongogmaskin.no/logo.png"></meta>
        <meta property="og:locale" content="nb_NO"></meta>
        <meta property="og:site_name" content={info?.name}></meta>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: info?.name,
            legalName: info?.name,
            url: "https://betongogmaskin.no/",
            logo: "https://betongogmaskin.no/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: info?.address1,
              addressRegion: info?.city,
              postalCode: info?.zipCode,
              addressCountry: info?.country
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Sales and support",
              telephone: info?.phone,
              email: info?.email
            },
            sameAs: info?.socialMedias.map(socialMedia => socialMedia?.url) ?? []
          })}
        </script>
      </Head>
      <Nav page={page} settings={settings} info={info} />
      <Hero title={page?.title} text={page?.text} image={page?.image} />
      {children}
      {page?.parallaxImage && (
        <Parallax
          bgImage={imageBuilder
            .image(page?.parallaxImage?.asset)
            .width(1920)
            .height(1000)
            .format("webp")
            .quality(90)
            .url()}
          strength={500}
          bgImageAlt={page?.parallaxImage?.alt ?? page?.parallaxImage?.caption ?? "Parallax image"}
        >
          {page?.parallaxImage?.caption && (
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
                <Typography component="h3" variant="h3" align="left" gutterBottom>
                  {page?.parallaxImage?.caption}
                </Typography>
              </div>
            </div>
          )}
        </Parallax>
      )}
      <Footer page={page} settings={settings} info={info} />
    </>
  );
}
