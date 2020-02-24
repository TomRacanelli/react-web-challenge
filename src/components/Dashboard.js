import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Months from "./common/Months";

import Topbar from "./Topbar";
import {yellow} from "@material-ui/core/colors";
import {Button} from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/Done";

const numeral = require("numeral");
numeral.defaultFormat("0,000");

const logo = require("../images/logo.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    //background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  loadingState: {
    opacity: 0.05
  },
  gridColumn: {
    padding: theme.spacing(0),
    height: 750
  },
  paper: {
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 750
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  topBar: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    backgroundColor: "#1a3e61",
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    height: 150,
    padding: theme.spacing(2),
  },
  blockValueChange: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: "-30px",
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
    height: 100,
    color: theme.palette.text.secondary,
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
  },
  padding1: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  croptomize: {
    color: "white",
    fontSize: 20
  },
  tiers: {
    color: "#1a3e61",
    fontSize: 24,
    fontWeight:"bold"
  },
  price: {
    paddingTop: 15,
    color: "white",
    fontSize: 22,
    fontWeight:"bold"
  },
  signupButton: {
    color: "#1a3e61",
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
    borderRadius: 20,
    textTransform: 'none',
    fontSize:"inherit",
    fontWeight: "bold",
    width: 240,
    marginTop: 90
  },
  purchaseButton: {
    color: "#1a3e61",
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800],
    },
    borderRadius: 20,
    textTransform: 'none',
    fontSize:"inherit",
    fontWeight: "bold",
    width: 240,
    marginTop: 20
  },
  featureIncludes: {
    marginTop: 20,
    color: "#1a3e61",
    fontSize: 18,
    fontWeight: "bold"
  },
  feature: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "bold",
    color: "#1a3e61",
    width: 200,
    textAlign: "left"
  },
  block: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  loanAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  mainBadge: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

const monthRange = Months;

class Dashboard extends Component {
  state = {
    loading: true,
    amount: 1,
    period: 3,
    start: 0,
    monthlyInterest: 0,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    data: []
  };

  updateValues() {
    const { amount, period, start } = this.state;
    console.log(this.state);
    const monthlyInterest =
      (amount * Math.pow(0.01 * 1.01, period)) / Math.pow(0.01, period - 1);
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment =
      period > start ? totalPayment / (period - start) : totalPayment / period;

    const data = Array.from({ length: period + start }, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        Type: delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        OtherType: Math.ceil(monthlyInterest).toFixed(0)
      };
    });

    this.setState({
      monthlyInterest,
      totalInterest,
      totalPayment,
      monthlyPayment,
      data
    });
  }

  componentDidMount() {
    this.updateValues();
  }

  handleChangeAmount = (event, value) => {
    if(value > 1 && value < 50) value = value-1;
    this.setState({ amount: value, loading: false });
    this.updateValues();
  };

  handleChangePeriod = (event, value) => {
    this.setState({ period: value, loading: false });
    this.updateValues();
  };

  handleChangeStart = (event, value) => {
    this.setState({ start: value, loading: false });
    this.updateValues();
  };

  render() {
    const { classes } = this.props;
    const {
      amount,
      period,
      start,
      monthlyPayment,
      monthlyInterest,
      data,
      loading
    } = this.state;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={10}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h6" className={classes.tiers}>
                      Croptomize Pricing Tiers
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4} className={classes.gridColumn}>
                <Paper className={classes.paper}>
                  <div>
                    <div className={classes.blockCenter}>
                      <img width={50} src={logo} alt="" />
                      <Typography variant="subtitle1" className={classes.croptomize}>
                        Croptomize
                      </Typography>
                      <Typography variant="body1" className={classes.price}>
                        Free
                      </Typography>
                    </div>
                    <Button className={classes.signupButton}>Sign Up</Button>
                    <Typography variant="subtitle1" className={classes.featureIncludes}>
                      iOS App Features include:
                    </Typography>
                    <List component="nav">
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Croptomize Intelligence - commodity price probabilities and grain market education"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Farm CFO Lite estimates cost of production and farm profitability to inform grain marketing decisions"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Local cash grain bids at your fingertips"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} className={classes.gridColumn}>
                <Paper className={classes.paper}>
                  <div>
                    <div className={classes.blockCenter}>
                      <img width={50} src={logo} alt="" />
                      <Typography variant="subtitle1" className={classes.croptomize}>
                        Croptomize (PRO)
                      </Typography>
                      <Typography variant="body1" className={classes.price}>
                        {numeral(amount).format() * 30}$/month
                      </Typography>
                    </div>
                    <div className={classes.blockValueChange}>
                      <div>
                        <Typography color="secondary" variant="h6" gutterBottom>
                          Number of Seats
                        </Typography>
                      </div>
                      <div className={classes.padding1}>
                        <Slider
                          value={amount}
                          min={1}
                          max={50}
                          step={10}
                          onChange={this.handleChangeAmount}
                        />
                      </div>
                      <div className={classes.rangeLabel}>
                        <div>
                          <Typography variant="subtitle2">1</Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">10</Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">20</Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">30</Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">40</Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle2">50</Typography>
                        </div>
                      </div>
                    </div>

                    <Button className={classes.purchaseButton}>Purchase</Button>

                    <Typography variant="subtitle1" className={classes.featureIncludes}>
                      iOS App Features include:
                    </Typography>
                    <List component="nav">
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="All features in free subscription"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Grain hedging"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Recommendations generated by the Croptomize statistical frame"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Full access to suite of Croptomize Intelligence tools: pricing frames for all available grain contracts, historical data, premium market commentary, data analytics, and more precise hedging tools"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Dynamically estimate farm profitability based on live market prices"
                        />
                      </ListItem>
                    </List>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
