import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import axios from "axios";
import io from "socket.io-client";
import { Grid } from "@material-ui/core";

import Room from "../../components/video/Room";

var classNames = require("classnames");

class Dashboard extends Component {
  state = {
    available: false,
    requests: [],
    token: null,
  };

  componentDidMount() {
    // TODO: Block hosts to access landing pages, because sockets creates
    axios
      .get(`/api/rooms/available/${this.props.auth.user.room}`)
      .then((res) => {
        this.setState({
          available: res.data.available,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    let server = process.env.REACT_APP_SOCKET_IP;
    this.socket = io(server);

    // Eğer role host ise, room oluştur.
    if (this.props.auth.user.role === "host") {
      this.socket.emit("join room", { room: this.props.auth.user.room });
      console.log(`Host joined ${this.props.auth.user.room}`);
    }

    this.socket.on("host meeting request", (messageFromBackend) => {
      console.log(messageFromBackend);
      let requests = this.state.requests;
      requests.push(messageFromBackend);
      this.setState({ requests });
    });

    this.socket.on("receive token", (messageFromBackend) => {
      console.log("Token: " + messageFromBackend);
      this.setState({ token: messageFromBackend });
    });

    this.socket.on("client disconnected", (client) => {
      let requests = this.state.requests;
      requests = requests.filter((req) => req.socket !== client);
      this.setState({ requests });
    });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onAvailableButtonClick = (e) => {
    e.preventDefault();
    let available = this.state.available;
    this.setState({ available: !available });

    this.socket.emit("availability input", {
      // As button clicked, availability and room info send to socket, and to clients
      available: !available,
      room: this.props.auth.user.room,
    });

    const host_id = this.props.auth.user.id;
    axios
      .post("/api/rooms/available", {
        host: host_id,
        available: !this.state.available,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  onRequestAccepted = (socket, name) => {
    this.socket.emit("request accepted", {
      guest_socket: socket,
      room: this.props.auth.user.room,
      guest_name: name,
      host_name: this.props.auth.user.name,
    });

    this.setState({ requests: [] });
  };

  onRequestDenied = (socket) => {
    this.socket.emit("request denied", {
      socket,
      room: this.props.auth.user.room,
    });

    let requests = this.state.requests;
    requests = requests.filter((req) => req.socket !== socket);
    this.setState({ requests });
  };

  onVideoExit = () => {
    this.setState({ token: null });
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div
            className="col s12 center-align"
            style={{ marginBottom: "40px" }}
          >
            <h4>
              <b>Selam,</b> {user.name} {user.surname}
              <p className="flow-text grey-text text-darken-1">
                Görüntülü görüşme talepleri için{" "}
                <span style={{ fontFamily: "monospace" }}>
                  <b>uygun</b>
                </span>{" "}
                musun?
              </p>
            </h4>
            <button
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
              onClick={this.onAvailableButtonClick}
            >
              {this.state.available ? "Uygun Değilim" : "Uygunum"}
            </button>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
          {this.state.requests.map((request) => {
            return (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                alignContent="center"
              >
                <h5 key={request.name}>{request.name}</h5>
                <h6 key={request.socket}>{request.socket}</h6>
                <h6>Poliçe Tutarı: 12000TL</h6>
                <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  className="btn btn-small waves-effect waves-light hoverable green accent-7"
                  onClick={() =>
                    this.onRequestAccepted(request.socket, request.name)
                  }
                >
                  Kabul Et
                </button>
                <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  className="btn btn-small waves-effect waves-light hoverable red accent-4"
                  onClick={() => this.onRequestDenied(request.socket)}
                >
                  Reddet
                </button>
              </Grid>
            );
          })}
          {this.state.token ? (
            <Room
              roomName={this.props.auth.user.room}
              token={this.state.token}
              handleLogout={this.onVideoExit}
            />
          ) : (
            <h5>Token yok</h5>
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
