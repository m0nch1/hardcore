import React from "react";
import { CssBaseline, Container, Grid, Paper } from "@material-ui/core";
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
      backgroundSize: "130em auto",
    },
    gridRoot: {
      margin: 0,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const App: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Grid container spacing={3} className={classes.gridRoot}>
          <Grid item sm={6}>
            <Paper className={classes.paper}>ジャケ</Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className={classes.paper}>曲名</Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
