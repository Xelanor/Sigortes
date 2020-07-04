import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Room from "../video/Room";

var classNames = require("classnames");

class Landing extends Component {
  state = {
    availability: {},
    available: false,
    name: "",
    waiting: false,
    waiting_message: "",
    token: null,
  };

  componentDidMount() {
    axios
      .get("/api/rooms/available")
      .then((res) => {
        this.setState({
          available: res.data > 0 ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    let server = process.env.REACT_APP_SOCKET_IP;
    this.socket = io(server);

    this.socket.on("availability output", ({ available, room }) => {
      // Gets the hosts availabilty info and rooms
      // If any host is available, available == true
      let availability = this.state.availability;
      availability[room] = available;
      const host_available = Object.values(availability).some(
        (room) => room === true
      );
      this.setState({ availability, available: host_available });
    });

    this.socket.on("request denied message", (messageFromBackend) => {
      this.setState({ waiting_message: "REDDİLDİ", waiting: false });
    });

    this.socket.on("request accepted message", (messageFromBackend) => {
      this.setState({ waiting_message: "KABUL EDİLDİ", waiting: false });
    });

    this.socket.on("receive token", (messageFromBackend) => {
      console.log("Token: " + messageFromBackend);
      this.setState({ token: messageFromBackend });
    });
  }

  onChatStartButton = (e) => {
    e.preventDefault();
    const { name, available } = this.state;

    if (!available || name.length < 3) {
      return;
    } else {
      this.socket.emit("meeting request", { name });
      this.setState({ waiting: true });
    }
  };

  onVideoExit = () => {
    this.setState({ token: null });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <span style={{ fontFamily: "monospace" }}>
                <b>Sigortes'e Hoşgeldiniz </b>
              </span>{" "}
            </h4>
            {this.state.waiting ? (
              <h4 style={{ color: "red" }}>BEKLENİYOR</h4>
            ) : (
              <h4>{this.state.waiting_message}</h4>
            )}
            <h4>
              <span style={{ fontFamily: "monospace" }}>
                Uygun Müşteri Temsilcisi: {this.state.available ? "VAR" : "YOK"}
              </span>{" "}
            </h4>
            <form noValidate autoComplete="off">
              <TextField
                id="name"
                label="İsminiz"
                variant="outlined"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </form>
            <button
              disabled={!this.state.available || this.state.waiting}
              style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginRight: "1rem",
              }}
              className={classNames({
                "btn btn-large waves-effect waves-light hoverable accent-3": true,
                green: this.state.available,
                red: !this.state.available,
              })}
              onClick={this.onChatStartButton}
            >
              Görüşmeyi Başlat
            </button>
            <br />
            {this.state.token ? (
              <Room
                roomName="room1"
                token={this.state.token}
                handleLogout={this.onVideoExit}
              />
            ) : (
              <h5>Token yok</h5>
            )}
            {/* <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Üye Ol
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Giriş Yap
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
