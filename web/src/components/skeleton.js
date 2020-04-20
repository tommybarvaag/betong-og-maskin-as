import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  /* Styles applied to the root element. */
  root: {
    display: "block",
    backgroundColor: theme.palette.action.hover,
    height: "1.2em"
  },
  /* Styles applied to the root element if `variant="text"`. */
  text: {
    marginTop: 0,
    marginBottom: 0,
    height: "auto",
    transformOrigin: "0 60%",
    transform: "scale(1, 0.60)",
    borderRadius: theme.shape.borderRadius,
    "&:empty:before": {
      content: '"\\00a0"'
    }
  },
  /* Styles applied to the root element if `variant="rect"`. */
  rect: {},
  /* Styles applied to the root element if `variant="circle"`. */
  circle: {
    borderRadius: "50%"
  },
  /* Styles applied to the root element if `animation="pulse"`. */
  pulse: {
    animation: "$pulse 1.5s ease-in-out 0.5s infinite"
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 1
    },
    "50%": {
      opacity: 0.4
    },
    "100%": {
      opacity: 1
    }
  },
  /* Styles applied to the root element if `animation="wave"`. */
  wave: {
    position: "relative",
    overflow: "hidden",
    "&::after": {
      animation: "$wave 1.6s linear 0.5s infinite",
      background: `linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent)`,
      content: '""',
      position: "absolute",
      transform: "translateX(-100%)", // Avoid flash during server-side hydration
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1
    }
  },
  "@keyframes wave": {
    "0%": {
      transform: "translateX(-100%)"
    },
    "60%": {
      // +0.5s of delay between each loop
      transform: "translateX(100%)"
    },
    "100%": {
      transform: "translateX(100%)"
    }
  }
}));

const Skeleton = React.forwardRef(function Skeleton(props, ref) {
  const {
    animation = "pulse",
    className,
    component: Component = "span",
    height,
    variant = "text",
    width,
    ...other
  } = props;

  const classes = useStyles(props);

  return (
    <Component
      ref={ref}
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes[animation]]: animation !== false
        },
        className
      )}
      {...other}
      style={{
        width,
        height,
        ...other.style
      }}
    />
  );
});

export default Skeleton;
