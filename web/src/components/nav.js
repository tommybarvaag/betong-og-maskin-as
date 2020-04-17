import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar
} from "@material-ui/core";
import { Email, Home, Menu, Phone } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Link from "./link";
import Svg from "./svg";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  "@global": {
    html: {
      overflowX: "hidden"
    },
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginRight: drawerWidth,
    backgroundColor: theme.palette.bomColors.yellow
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: {
    minHeight: "56px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.bomColors.black,
    color: theme.palette.common.white
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  toolbarContactAndLogo: {
    width: "100%"
  },
  toolbarMenuAndSearch: {
    width: "100%",
    backgroundColor: theme.palette.bomColors.black
  },
  toolbarContainer: {
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    alignItems: "center"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  toolbarMenu: {
    flexGrow: 1
  },
  toolbarSearch: {},
  link: {
    margin: theme.spacing(1, 1.5)
  },
  toolbarPhoneLogo: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  menuLink: {
    margin: theme.spacing(1, 1.5),
    color: theme.palette.common.white
  },
  contact: {
    display: "flex"
  },
  listItem: {
    color: theme.palette.bomColors.black
  },
  listItemLink: {
    color: theme.palette.bomColors.black,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.bomColors.black
    }
  },
  avatar: {
    backgroundColor: theme.palette.bomColors.black
  },
  swipeableDrawerListItemText: {
    color: theme.palette.common.white
  },
  swipeableDrawerListItemIcon: {
    color: theme.palette.bomColors.yellow
  }
}));

export default function Nav(props) {
  const { settings, info } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerOpen = () => {};

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(settings);

  const address = `${info?.address1}, ${info?.zipCode} ${info?.city}`;

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Hidden xsDown>
        <Toolbar className={classes.toolbarContactAndLogo}>
          <Container className={classes.toolbarContainer}>
            <Link
              className={classes.toolbarTitle}
              href="/"
              variant="subtitle1"
              color="textSecondary"
            >
              <Svg className={classes.logo} name="Logo" />
            </Link>
            <List className={classes.contact}>
              <ListItem className={classes.listItem}>
                <a className={classes.listItemLink} href={`tel:${info?.phone}`}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <Phone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Ring oss" secondary={info?.phone} />
                </a>
              </ListItem>
              <ListItem className={classes.listItem}>
                <a className={classes.listItemLink} href={`mailto:${info?.email}`}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Send oss en e-post" secondary={info?.email} />
                </a>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <Home />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Hvor du finner oss" secondary={address} />
              </ListItem>
            </List>
          </Container>
        </Toolbar>
        <Toolbar className={classes.toolbarMenuAndSearch}>
          <Container className={classes.toolbarContainer}>
            <nav className={classes.toolbarMenu}>
              {settings?.menu &&
                settings?.menu.length > 0 &&
                settings?.menu.map((menuItem, index) => (
                  <Link
                    key={`menu-item-${index}`}
                    className={classes.menuLink}
                    href={menuItem.slug?.current}
                    variant="button"
                    color="textPrimary"
                  >
                    {menuItem.title}
                  </Link>
                ))}
            </nav>
            <div className={classes.toolbarSearch}></div>
          </Container>
        </Toolbar>
      </Hidden>
      <Hidden smUp>
        <Toolbar disableGutters>
          <Button href={`tel:${info?.phone}`}>
            <Phone />
          </Button>
          <Link
            className={classes.toolbarPhoneLogo}
            href={"/"}
            variant="subtitle1"
            color="textSecondary"
          >
            <Svg className={classes.logo} name="Logo" />
          </Link>
          <Button aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </Button>
        </Toolbar>
        <SwipeableDrawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <div>
            <div className={classes.toolbar} key={"swipeable-toolbar"}>
              <Svg className={classes.logo} name="LogoYellow" />
            </div>
            <Divider key={"swipeable-divider-1"} />
            <List key={"swipeable-toolbar-menu-list"}>
              {settings?.menu &&
                settings?.menu.length > 0 &&
                settings?.menu.map((menuItem, index) => (
                  <ListItem
                    component={Link}
                    href={menuItem.slug?.current}
                    onClick={handleDrawerToggle}
                    key={index}
                  >
                    <ListItemText
                      className={classes.swipeableDrawerListItemText}
                      primary={menuItem.title}
                    />
                  </ListItem>
                ))}
            </List>
            <Divider key={"swipeable-toolbar-divider-2"} />
            <List key={"swipeable-toolbar-actions"}>
              <ListItem
                component="a"
                href={`tel:${info?.phone}`}
                button
                key={"swipeable-drawer-phone"}
              >
                <ListItemIcon className={classes.swipeableDrawerListItemIcon}>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={info?.phone} />
              </ListItem>
              <ListItem
                component="a"
                href={`mailto:${info?.email}`}
                button
                key={"swipeable-drawer-email"}
              >
                <ListItemIcon className={classes.swipeableDrawerListItemIcon}>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={info?.email} />
              </ListItem>
              <ListItem button key={"swipeable-drawer-home"}>
                <ListItemIcon className={classes.swipeableDrawerListItemIcon}>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={address} />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </Hidden>
    </AppBar>
  );
}
