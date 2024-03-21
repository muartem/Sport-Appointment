import React, {useCallback, useEffect, useState} from "react";
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

import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import {
  addQualification,
  deleteQualification,
  getQualifications,
  resetQualifications
} from "../../redux/Ducks/Qualifications.duck";
import {getCoaches, resetCoach} from "../../redux/Ducks/Coaches.duck";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 200,
    height: 250,
    overflow: "hidden",
    background: "#01010152",
    color: "#fff",
    display: "flex",
    flexDirection: "Column"
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
  list:{
    overflow: "auto",
  }

}));

export default function TransferList({searchId}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const qualifications = useSelector((state) => state.qualification.data);

  const coaches = useSelector((state) => state.coach.data);

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState( []);
  const [right, setRight] = useState( []);

  const update = useCallback(
    (list) => {
      try {
        const selectedId = qualifications.map(q => String(q.coachId))
        console.log(selectedId);
        const left = list.filter((l) => selectedId.indexOf(l.id) === -1)
        const right = list.filter((l) => selectedId.indexOf(l.id) !== -1)
        console.log(left);
        console.log(right);
        setLeft([...left])
        setRight([...right])
      }
      catch (e){
        setLeft([...coaches])
      }
    },
    [coaches, qualifications],
  );


  useEffect(  () => {
    dispatch(getQualifications('serviceId', searchId));
    dispatch(getCoaches())
    return () => {
      dispatch(resetQualifications())
      dispatch(resetCoach())
    }
  },[dispatch, searchId]);

  useEffect(() => {
    update(coaches)
    // eslint-disable-next-line
    return () => {
      setLeft([])
      setRight([])
    }
  }, [coaches, qualifications, update])

  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const createQualification = (coachId) => ({
      id: String(Math.floor(performance.now() * 321 / +coachId / +searchId)),
      serviceId: searchId,
      coachId
    })

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    left.forEach(c => dispatch(addQualification(
        createQualification(c.id),
        'serviceId',
        searchId
    )))
  };

  const handleCheckedRight =  () => {
    leftChecked.forEach(c => dispatch(addQualification(
        createQualification(c.id),
        'serviceId',
        searchId
    )))
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const selectedId = rightChecked.map(c => c.id)
    const qForDel = qualifications.filter((q) => selectedId.indexOf(q.coachId) !== -1)
    qForDel.forEach(q => dispatch(deleteQualification(q.id)))

    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    const selectedId = right.map(c => c.id)

    const qForDel = qualifications.filter((q) => selectedId.indexOf(q.coachId) !== -1)

    qForDel.forEach(q => dispatch(deleteQualification(q.id)))

    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (title, items) => (
    <Paper className={classes.paper}>
      <CardHeader className={classes.header}
          title={title}
      />
      <Divider className={classes.hr} />
      <List dense  className={classes.list} component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem
              key={value.id}
              role="listItem"
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
              <ListItemText id={labelId} primary={value.firstName +" "+ value.lastName} />
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
