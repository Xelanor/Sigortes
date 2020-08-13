import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import classNames from "classnames";

import Transition from "../../components/transition/Transition";
import MeetingRequests from "./meeting-requests/MeetingRequests";
import VideoMeeting from "./VideoMeeting";

class CustomerServicePage extends Component {
  state = {
    available: false,
    requests: [],
    token: null,
    disconnected: false,
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

    this.socket.on("disconnect", () => {
      this.setState({ requests: [], disconnected: true, available: false });
    });
  }

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
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className="flex flex-col items-center"
      >
        <Transition
          show={!this.state.token}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="flex flex-col mb-2 mt-8 mx-4">
            <div className="flex">
              <div className="text-2xl">Selam, &nbsp;</div>
              <div className="text-2xl font-bold">
                {user.name} {user.surname}
              </div>
            </div>
            {this.state.disconnected ? (
              <div>
                Server ile bağlantınız kesilmiştir veya yeni bir sekmede
                açılmıştır.
              </div>
            ) : (
              <>
                <div className="text-2xl">
                  Görüntülü görüşme talepleri için uygun musun?
                </div>
                <button
                  className={classNames({
                    "mt-2 p-1 text-white": true,
                    "bg-green-400": this.state.available,
                    "bg-red-400": !this.state.available,
                  })}
                  onClick={this.onAvailableButtonClick}
                >
                  {this.state.available ? "Uygun Değilim" : "Uygunum"}
                </button>
              </>
            )}
          </div>
        </Transition>
        <Transition
          show={this.state.requests.length > 0}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-30"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div class="max-w-screen-xl flex flex-col mx-auto mt-4">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <MeetingRequests
                  requests={this.state.requests}
                  accept={this.onRequestAccepted}
                  deny={this.onRequestDenied}
                />
              </div>
            </div>
          </div>
        </Transition>
        <Transition
          show={this.state.token}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <VideoMeeting
            socket={this.socket}
            token={this.state.token}
            room={this.props.auth.user.room}
            handleLogout={this.onVideoExit}
          />
        </Transition>
      </div>
    );
  }
}

CustomerServicePage.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CustomerServicePage);
