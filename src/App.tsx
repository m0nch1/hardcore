import React from "react";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import "./App.css";

interface Props {}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100vh",
      backgroundColor: "#546788",
      backgroundImage: "url('../img/landscape.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
    },
    container: {
      height: "100%",
      backdropFilter: "blur(5px)",
      display: "flex",
    },
    gridContainer: {
      margin: "0 auto",
      width: "100%",
      alignItems: "center",
    },
    gridItem: {
      width: "50%",
      position: "relative",
    },
    jacketImgWrap: {
      top: "50%",
      left: "50%",
      width: "50%",
      margin: "0 auto",
    },
    jacketImg: {
      width: "100%",
      boxShadow: "0px 0px 25px 5px",
    },
    card: {
      borderBottom: "3px dotted",
      textAlign: "center",
      color: "white",
      fontSize: "3vw",
      lineHeight: "0.4em",
      fontWeight: "bold",
    },
    leftIn: {
      position: "relative",
      animation: "$left-in 3s ease-in-out 0s",
      // animationDuration: "3s",
      // animationTimingFunction: "ease-in-out",
      // animationDelay: "0s",
    },
    rightIn: {
      position: "relative",
      animation: "$right-in 3s ease-in-out 0s",
      // animationDuration: "3s",
      // animationDelay: "0s",
      // animationTimingFunction: "ease-in-out",
    },
    horizontal: {
      animation: "$horizontal 1.5s ease-in-out 0s alternate infinite",
      // animationDuration: "1.5s",
      // animationDelay: "0s",
      // animationTimingFunction: "ease-in-out",
      // animationDirection: "alternate",
      // animationIterationCount: "infinite",
    },
    vertical: {
      animation: "$vertical 1s ease-in-out 0s alternate infinite",
      // animationDuration: "1s",
      // animationDelay: "0s",
      // animationTimingFunction: "ease-in-out",
      // animationDirection: "alternate",
      // animationIterationCount: "infinite",
    },
    "@keyframes left-in": {
      from: { left: "-30%" },
      to: { left: "0" },
    },
    "@keyframes right-in": {
      from: { right: "-700px" },
      to: { right: "0" },
    },
    "@keyframes horizontal": {
      from: { transform: "translateX( -8px)" },
      to: { transform: "translateX(  0px)" },
    },
    "@keyframes vertical": {
      from: { transform: "translate(-50%,-50%)" },
      to: { transform: "translate(-50%,-55%)" },
    },
  })
);

const App: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
<<<<<<< Updated upstream
      <Container maxWidth={false}>
        <Grid container spacing={3} className={classes.gridRoot}>
          <Grid item sm={6}>
            <Paper className={classes.paper}>ジャケ</Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className={classes.paper}>曲名</Paper>
=======
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid
            item
            xs={12}
            sm={6}
            className={(classes.gridItem, classes.leftIn, classes.horizontal)}
          >
            <div className={classes.jacketImgWrap}>
              <img
                className={classes.jacketImg}
                src="../img/lpimg.jpg"
                alt="jacket"
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={(classes.gridItem, classes.rightIn, classes.horizontal)}
          >
            <div className={classes.card}>
              <p>You Are Listening to</p>
              <p>
                -<span>music</span>-
              </p>
              <p>This is awesome song</p>
            </div>
>>>>>>> Stashed changes
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
