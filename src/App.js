import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home';
import CreateUser from './components/Create/CreateUser';
import EditUser from './components/Edit/EditUser'
import Header from './components/layouts/header'
import "./App.scss"

class App extends Component {

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header/>
          <main className="main">
            <Route exact path="/" component={Home}/>
            <Route path="/create" component={CreateUser}/>
            <Route path="/edit" component={EditUser}/>
          </main>
        </div>
      </Router>
    )
  }
}

export default App