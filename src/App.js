import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import NotFound from "./views/notFound";
import Home from "./views/home/index";
import Login from "./views/home/login";
import Footer from "./components/footer";
import Register from "./views/home/register";
import Problematic from "./views/problematics";
import Proposals from "./views/home/proposal";
import CreateProposals from "./views/problematics/proposals";
import Prioritize from "./views/home/prioritize";
import Admin from "./views/admin";
import AboutUs from "./views/aboutus";
import ProposalsAdmin from "./views/admin/proposals";
import ProblematicAdmin from "./views/admin/problematic";
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
              <Route path="/aboutus" component={AboutUs} exact />
              <Route path="/survey" component={Prioritize} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/problematics/create/:id" component={CreateProposals} exact />
              <Route path="/problematics/:id" component={Problematic} exact />
              <Route path="/problematics/:id/:reference" component={Proposals} exact />
              <Route path="/admin/proposals/:id" component={ProposalsAdmin} exact />
              <Route path="/admin/problematics" component={ProblematicAdmin} exact />
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
