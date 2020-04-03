import React, { useState, lazy } from 'react';

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import AsyncComponentLoader from 'components/AsyncComponentLoader';

import { useLocation } from 'react-router-dom';

import Link from 'components/Link';
import { noop, isMobile } from 'utils';
import { menuItems, authorInfo } from 'config';

import useStyles from './styles';

export const MainList = ({ onMenuClose, items }) => {
  const location = useLocation();

  return <List>
    <div>
      {
        items.map(item => {
          return (
            <ListItem
              onClick={onMenuClose}
              button
              selected={
                location.pathname === item.path ||
                (location.pathname === '/' && item.isDefault)
              }
              key={item.path}
            >
              <Link to={item.path}>
                <ListItemIcon className="_relative">
                  {/* NOTE: it should be removed */}
                  {AsyncComponentLoader(
                    lazy(() => import(`./icons/${item.icon}`)), { size: 30, withoutBackground: true }
                  )()}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </Link>
            </ListItem>
          );
        })
      }
    </div>
  </List>
};

function ContactsDialog({ handleDialogClose, open }) {
  return (
    <Dialog onClose={handleDialogClose} aria-labelledby="contacts-dialog" open={open}>
      <DialogTitle id="contacts-dialog">{authorInfo.message}</DialogTitle>
      <List>
        <ListItem button>
          <a href={`mailto: ${authorInfo.email}`} className="link-without-styles">
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={authorInfo.email} />
          </a>
        </ListItem>
      </List>
    </Dialog>
  );
}

export const OptionalList = ({ handleDialogOpen }) => {
  return (
    <List className="at-the-bottom">
      <div>
        <ListItem button onClick={handleDialogOpen}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItem>
      </div>
    </List>
  );
};

export default function Menu({ isOpen, onClose, onOpen }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleDialogClose() {
    setOpen(false);
  }

  function handleDialogOpen() {
    setOpen(true);
    onClose();
  }

  return (
    <SwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      disableBackdropTransition={false}
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && !isMobile && classes.drawerPaperClose),
      }}
      open={isOpen}
      onOpen={(onOpen)}
      onClose={isMobile ? (onClose) : noop}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <MainList items={menuItems.main} onMenuClose={isMobile ? onClose : noop} />
      <Divider />
      <OptionalList handleDialogOpen={handleDialogOpen} />
      <ContactsDialog open={open} handleDialogClose={handleDialogClose} />
    </SwipeableDrawer>
  );
}
