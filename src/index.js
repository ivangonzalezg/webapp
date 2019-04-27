import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyB3EP--traMfKljj3siKhCj5b0fHMwea94",
  authDomain: "hackthon-23b1d.firebaseapp.com",
  databaseURL: "https://hackthon-23b1d.firebaseio.com",
  projectId: "hackthon-23b1d",
  storageBucket: "hackthon-23b1d.appspot.com",
  messagingSenderId: "486174546311"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

