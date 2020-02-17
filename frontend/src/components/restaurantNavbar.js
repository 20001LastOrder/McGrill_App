import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})); 

export default function SimpleList({onSelect, category}) {

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [newCategory, setNewCategory] = React.useState("Home");

  const handleListItemClick = (event, index) => {
      console.log(index);
    setSelectedIndex(index);
    onSelect(newCategory);
  };

  const indexToCategory = (index) => {
      switch(index)  {
          case 0: setNewCategory("Home")
          case 1: setNewCategory("All Orders")
          case 2: setNewCategory("Cancelled Orders")
          case 3: setNewCategory("Menu")
      }
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="resto nav">
            <ListItem 
                button
                selected={selectedIndex === 0}
                onClick={event => handleListItemClick(event, 0)}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem 
                button
                selected={selectedIndex === 1}
                onClick={event => 
                    handleListItemClick(event, 1)}>
                <ListItemText primary="All Orders" />
            </ListItem>
            <ListItem 
                button
                selected={selectedIndex === 2}
                onClick={event => handleListItemClick(event, 2)}>
                <ListItemText primary="Cancelled Orders" />
            </ListItem>
            <ListItem 
                button
                selected={selectedIndex === 3}
                onClick={event => handleListItemClick(event, 3)}>
            <ListItemText primary="Menu" />
            </ListItem>
        </List>
    </div>
  );
}