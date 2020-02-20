import * as jquery from 'jquery';
import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import RootStore from './RootStore';
import { Provider } from 'mobx-react';

import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './assets/scss/index.scss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { LoadingModal } from 'components/common';
import { ToastErrorMessage } from 'components/common/toast';

Object.assign(global, {
  $: jquery,
  jQuery: jquery
});

require('./../node_modules/semantic-ui-calendar/dist/calendar.min.js');
require('./../node_modules/semantic-ui-calendar/dist/calendar.min.css');
require('./semantic/semantic.ui.popup.js');
require('./semantic/semantic.ui.transition.js');

const history = createBrowserHistory();

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"NotoSansThaiUI-Medium", "NotoSans-Medium", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={THEME}>
      <Provider {...RootStore}>
        <Router history={history}>
          {/* <ScrollReset /> */}
          {/* <CookiesNotification /> */}
          <Routes />
          <LoadingModal />
          <ToastErrorMessage />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
