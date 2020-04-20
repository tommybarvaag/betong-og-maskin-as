import Typography from "@material-ui/core/Typography";
import BaseBlockContent from "@sanity/block-content-to-react";
import React from "react";

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        default:
          return <Typography paragraph>{props.children}</Typography>;
      }
    }
  }
};

export default function BlockText({ blocks }) {
  return blocks ? <BaseBlockContent blocks={blocks} serializers={serializers} /> : null;
}
