import React from 'react';

import Content from 'sections/Content';
import Copyright from 'sections/Copyright';
import Navigation from 'sections/Navigation';

import useStyles from './styles';

export default function Structure() {
  const classes = useStyles();

  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.mainSection}>
          <Content />
          <Copyright />
        </div>
      </main>
    </>
  );
}
