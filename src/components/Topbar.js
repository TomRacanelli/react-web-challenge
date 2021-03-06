import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link as MaterialLink } from "@material-ui/core";
import { yellow } from '@material-ui/core/colors';
import { Button } from "@material-ui/core/"
import Menu from "./Menu";

const logo = require("../images/logo.svg");

const styles = theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    //borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "#1a3e61"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    paddingLeft: 300,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1em"
    }
  },
  accountDiv: {
    display: "inline-block",
    paddingLeft: 50,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.9em"
    }
  },
  accountButton: {
    color: "#1a3e61",
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
    borderRadius: 20,
    textTransform: 'none',
    fontSize:"inherit",
    width: 130
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    marginLeft: 300,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 16,
    minWidth: "auto",
    color: "white",
    textTransform: 'none',
  }
});

class Topbar extends Component {
  state = {
    value: 0,
    menuDrawer: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  current = () => {
    if (this.props.currentPath === "/home") {
      return 0;
    }
    if (this.props.currentPath === "/product") {
      return 1;
    }
    if (this.props.currentPath === "/about") {
      return 2;
    }
    if (this.props.currentPath === "/pricing") {
      return 3;
    }
    if (this.props.currentPath === "/blog") {
      return 4;
    }
    if (this.props.currentPath === "/contact") {
      return 5;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={12} alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              {!this.props.noTabs && (
                <React.Fragment>
                  <div className={classes.productLogo}>
                      <img width={50} src={logo} alt="" />
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer
                      anchor="right"
                      open={this.state.menuDrawer}
                      onClose={this.mobileMenuClose}
                      onOpen={this.mobileMenuOpen}
                    >
                      <AppBar title="Menu" />
                      <List>
                        {Menu.map((item, index) => (
                          <ListItem
                            component={item.external ? MaterialLink : Link}
                            href={item.external ? item.pathname : null}
                            to={
                              item.external
                                ? null
                                : {
                                    pathname: item.pathname,
                                    search: this.props.location.search
                                  }
                            }
                            button
                            key={item.label}
                          >
                            <ListItemText primary={item.label} />
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                    <Tabs
                      value={this.current() || this.state.value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      {Menu.map((item, index) => (
                        <Tab
                          key={index}
                          component={item.external ? MaterialLink : Link}
                          href={item.external ? item.pathname : null}
                          to={
                            item.external
                              ? null
                              : {
                                  pathname: item.pathname,
                                  search: this.props.location.search
                                }
                          }
                          classes={{ root: classes.tabItem }}
                          label={item.label}
                        />
                      ))}
                      <div className={classes.accountDiv}>
                        <Button className={classes.accountButton}>Account</Button>
                      </div>
                    </Tabs>
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Topbar));
