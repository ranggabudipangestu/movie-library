import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import ReactDOM from 'react-dom';

import 'graphiql/graphiql.css';
import './app.css';

const fetcher = createGraphiQLFetcher({
  url: '/graphql',
});

ReactDOM.render(
  <div className='App'>
    <GraphiQL fetcher={fetcher} /> 
  </div>,

document.body);