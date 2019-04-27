import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import NotFound from "./views/notFound";
import Home from "./views/home/index";
import Admin from "./views/admin";
import Footer from "./components/footer";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container-app">
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/admin" component={Admin} exact />
              <Route component={NotFound} />
            </Switch>
          </div>
          <hr />
          <div className="footer-app">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
