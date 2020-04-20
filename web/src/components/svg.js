import makeStyles from "@material-ui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import LogoYellow from "../../public/logo-yellow.svg";
import Logo from "../../public/logo.svg";

const useStyles = makeStyles(theme => ({
  svgContainer: {
    display: "flex",
    alignItems: "center"
  }
}));

const renderSvg = name => {
  switch (name) {
    case "Logo":
      return <Logo />;
    case "LogoYellow":
      return <LogoYellow />;
    default:
      return null;
  }
};

export default function Svg({ className, name, marginLeft }) {
  const classes = useStyles();
  return <div className={clsx(classes.svgContainer, className)}>{renderSvg(name)}</div>;
}
