import React, { Component } from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/DoneRounded";
import Divider from "@material-ui/core/Divider";
import * as firebase from "firebase";

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      name1: "",
      name2: "",
      name3: "",
      name4: "",
      name5: ""
    };
  }

  componentDidMount() {
    var database = firebase.database().ref();
    database
      .child("problems")
      .once("value")
      .then(data => {
        const dbinfo = data.toJSON();
        for (let index = 1; index < 6; index++) {
          this.setState({
            ["name" + index]: dbinfo["name" + index]
          });
        }
      });
  }

  redirect(e) {
    console.log(e);
  }
  render() {
    const { name1, name2, name3, name4, name5 } = this.state;
    return (
      <div className="main-sidebar">
        <MenuList>
          <MenuItem>
            <ListItemText inset>
              <span>Lista de problemáticas</span>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <DoneIcon />
            <ListItemText inset>
              <a href={this.props.url + "1"}>{name1}</a>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <DoneIcon />
            <ListItemText inset>
              <a href={this.props.url + "2"}>{name2}</a>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <DoneIcon />
            <ListItemText inset>
              <a href={this.props.url + "3"}>{name3}</a>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <DoneIcon />
            <ListItemText inset>
              <a href={this.props.url + "4"}>{name4}</a>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <DoneIcon />
            <ListItemText inset>
              <a href={this.props.url + "5"}>{name5}</a>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    );
  }
}

export default Sidebar;
