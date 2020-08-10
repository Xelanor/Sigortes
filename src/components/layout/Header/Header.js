import React, { Component } from "react";

import Navbar from "./Navbar";
import UpperNavbar from "./UpperNavbar";

class Header extends Component {
  state = {};
  render() {
    return (
      <header>
        <UpperNavbar />
        <Navbar />
      </header>
    );
  }
}

export default Header;
