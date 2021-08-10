import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import 'tailwindcss/tailwind.css';

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
