import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
              }}
              className="col s5 brand-logo center black-text"
            >
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
