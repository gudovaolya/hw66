import React, { Component, Fragment } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import AddQuote from "./containers/AddQuote/AddQuote";
import EditQuote from "./containers/EditQuote/EditQuote";
import Header from "./components/Header/Header";
import QuotesList from "./containers/QuotesList/QuotesList";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Fragment>
              <Header />
              <Switch>
                  <Route path="/" exact component={QuotesList}/>
                  <Route path="/add-quote" exact component={AddQuote}/>
                  <Route path="/edit-quote/:id" component={EditQuote}/>
                  <Route path="/quotes/:category" component={QuotesList}/>
                  <Route render={() => <h1>404 page not found</h1>}/>
              </Switch>
          </Fragment>
      </div>
    );
  }
}

export default App;
