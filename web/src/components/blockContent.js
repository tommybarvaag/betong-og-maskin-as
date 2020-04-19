import { Typography } from "@material-ui/core";
import BaseBlockContent from "@sanity/block-content-to-react";
import React from "react";
import Figure from "./figure";
import Slideshow from "./slideshow";

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case "h2":
          return (
            <Typography component="h2" variant="h2">
              {props.children}
            </Typography>
          );
        case "h3":
          return (
            <Typography component="h3" variant="h3">
              {props.children}
            </Typography>
          );
        case "h4":
          return (
            <Typography component="h4" variant="h4">
              {props.children}
            </Typography>
          );
        case "blockquote":
          return <blockquote>{props.children}</blockquote>;
        default:
          return <Typography paragraph>{props.children}</Typography>;
      }
    },
    figure(props) {
      return <Figure {...props.node} />;
    },
    slideshow(props) {
      return <Slideshow {...props.node} />;
    }
  }
};

function BlockContent({ blocks }) {
  return blocks ? <BaseBlockContent blocks={blocks} serializers={serializers} /> : null;
}

export default BlockContent;
