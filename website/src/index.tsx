import './index.css';
import './../node_modules/semantic-ui-calendar/dist/calendar.min.css';
import './semantic/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

document.body.style.fontFamily = 'NotoSansThaiUI-Medium';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
