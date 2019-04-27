import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import NotFound from "./views/notFound";
import Home from "./views/home/index";
import Admin from "./views/admin";
import Login from "./views/home/login";
import Register from "./views/home/register";
import Proposals from "./views/admin/proposals";
import Problematic from "./views/admin/problematic";
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
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/admin/problematics" component={Problematic} exact />
              <Route path="/admin/proposals/:id" component={Proposals} exact />
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
