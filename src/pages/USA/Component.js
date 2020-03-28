import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Tooltip from 'react-tooltip';

import Settings from 'components/Maps/Settings';
import USAMap from 'components/Maps/USA';
import Loading from 'components/Loading';

import { useAPI } from 'api';

import useStyles from './styles';

const urls = {
  states: '/countries/US/confirmed?level=provinceState',
  counties: '/countries/US/confirmed',
};

export default function USA() {
  const [setting, setSetting] = useState('confirmed');
  const [tooltipContent, setTooltipContent] = useState('');
  const [dividedInto, setDividedInto] = useState('states');
  const [data, isLoading] = useAPI(urls[dividedInto]);
  const classes = useStyles();

  const handleSettingsChange = event => {
    setSetting(event.target.value);
  };

  const handleUSADivisionChange = event => {
    setDividedInto(event.target.value);
  };

  return (
    <Paper className={classes.root}>
      {
        isLoading
          ? <Loading />
          : (
            <div className="full-size">
              <Settings value={setting} onChange={handleSettingsChange} onUSADivisionChange={handleUSADivisionChange} dividedInto={dividedInto} />
              <USAMap dividedInto={dividedInto} data={data} setting={setting} setTooltipContent={setTooltipContent} />
              <Tooltip>{tooltipContent}</Tooltip>
            </div>
          )
      }
    </Paper>
  );
}
