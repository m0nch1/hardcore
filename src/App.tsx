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
      overflow: "hidden",
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
      fontFamily: "'Contrail One', cursive",
      borderBottom: "0.3vw dashed",
      textAlign: "center",
      color: "white",
      fontSize: "3vw",
      lineHeight: "0.4em",
      fontWeight: "bold",
    },
    leftIn: {
      animationName: "$left-in",
      animationDuration: "3s",
      animationTimingFunction: "ease-in-out",
      animationDelay: "0s",
    },
    rightIn: {
      animationName: "$right-in",
      animationDuration: "3s",
      animationDelay: "0s",
      animationTimingFunction: "ease-in-out",
    },
    horizontal: {
      animationName: "$horizontal",
      animationDuration: "1.5s",
      animationDelay: "0s",
      animationTimingFunction: "ease-in-out",
      animationDirection: "alternate",
      animationIterationCount: "infinite",
    },
    vertical: {
      animationName: "$vertical",
      animationDuration: "1s",
      animationDelay: "0s",
      animationTimingFunction: "ease-in-out",
      animationDirection: "alternate",
      animationIterationCount: "infinite",
    },
    "@keyframes left-in": {
      from: { left: "-50%" },
      to: { left: "0" },
    },
    "@keyframes right-in": {
      from: { right: "-50%" },
      to: { right: "0" },
    },
    "@keyframes horizontal": {
      from: { transform: "translateX( -8px)" },
      to: { transform: "translateX(  0px)" },
    },
    "@keyframes vertical": {
      from: { transform: "translateY(-5%)" },
      to: { transform: "translateY(5%)" },
    },
  })
);

const App: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth={false} className={classes.container}>
        <Grid
          container
          spacing={3}
          className={`${classes.gridContainer} ${classes.horizontal}`}
        >
          <Grid
            item
            xs={12}
            sm={6}
            className={`${classes.gridItem} ${classes.leftIn}`}
          >
            <div className={`${classes.jacketImgWrap} ${classes.vertical}`}>
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
            className={`${classes.gridItem} ${classes.rightIn}`}
          >
            <div className={classes.card}>
              <p>You Are Listening to</p>
              <p>
                -<span>music</span>-
              </p>
              <p>This is awesome song</p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
