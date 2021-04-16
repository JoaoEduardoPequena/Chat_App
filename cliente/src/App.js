import React, { Component,Fragment } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { Layout } from './components/Layout'; 
import {Chat} from "./components/Chat";


export default class App extends Component {

  render ()  {
    return (
      <Fragment>
      <Layout>
      <Switch>
        <Route  path='/' component={Chat} />
      </Switch>
      </Layout>
      </Fragment>
    );
  }
}
