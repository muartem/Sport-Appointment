import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {
  addQualification,
  deleteQualifications,
  getCoaches,
  getQualifications,
  getServices,
  resetCoach,
  resetQualifications
} from "../../redux/actions";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 200,
    height: 230,
    overflow: "auto",
    background: "#01010152",
    color: "#fff",
  },
  header: {
    padding: "8px",
    color: "#f5ff01",
    fontSize: "1rem"
  },
  hr: {
    background: "#fff",
  },
  button: {
    margin: theme.spacing(0.5, 0),
    color: "#f5ff01",
    borderColor: "#f5ff01",
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const qualifications = useSelector((state) => state.qualification.data);

  const services = useSelector((state) => state.service.data);
  const coaches = useSelector((state) => state.coach.data);

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState( []);
  const [right, setRight] = React.useState( []);

  const update = (list) => {
    const selectedId = qualifications.map(q => q.CoachId)

    const left = list.filter((l) => selectedId.indexOf(l.id) === -1)
    const right = list.filter((l) => selectedId.indexOf(l.id) !== -1)

    setLeft(prevState => [...left.map(l=> `${l.firstName}  ${l.lastName}`)])
    setRight(prevState => [...right.map(l=> `${l.firstName}  ${l.lastName}`)])
  }

  useEffect(async () => {
    await dispatch(getQualifications(props.searchParam, props.searchId));
    await dispatch(getCoaches())

    setTimeout(()=> update(coaches), 1000)

    return () => {
      dispatch(resetQualifications())
      dispatch(resetCoach())
    }
  },[dispatch]);

  console.log(qualifications)

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const createQualification = (coachID) => {
    return {
      id: coachID * props.searchId,
      ServiceId: props.searchId,
      CoachId: coachID
    }
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);

    //coaches.forEach(c => dispatch(addQualification(createQualification(c.id))))
    dispatch(addQualification(coaches.map(c=> createQualification(c.id))))
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));

  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);

    qualifications.forEach(q => dispatch(deleteQualifications(q.id)))
  };

  const customList = (title, items) => (
    <Paper className={classes.paper}>
      <CardHeader className={classes.header}
          title={title}
      />
      <Divider className={classes.hr} />
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  style={{ color: "#f5ff01" }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>{customList('Available', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selected', right)}</Grid>
    </Grid>
  );
}
