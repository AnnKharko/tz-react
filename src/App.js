import './App.css';
import React from 'react';
import {BaseLayout} from './layouts';
import {Home} from "./pages/home";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import {MovieDetails} from "./pages";

//show error handler for react components
// notifications

function App() {

    const history = useHistory();
  return (
      <BaseLayout>
          <Switch>
              <Route path={'/'} exact>
                  < Home/>
              </Route>

              <Route path={'/movie/:id'}>
                  <MovieDetails/>
              </Route>

              {/*<Redirect to = '/' />*/}

              <Route>
                  <h1>PATH NOT FOUND
                      <button onClick={() => history.push('/')}>go home</button>
                  </h1>
              </Route>
          </Switch>


      </BaseLayout>
  );
}

export default App;
