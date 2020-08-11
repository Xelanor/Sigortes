import React, { Component } from "react";
import axios from "axios";
import Transition from "../../components/transition/Transition";
import io from "socket.io-client";
import Loader from "react-loader-spinner";

import MeetingChoice from "./MeetingChoice";
import VideoMeeting from "./VideoMeeting";

class MeetingPage extends Component {
  state = {
    meetingChoice: "",
    available: false,
    availability: {},
    loading: false,
    waiting: false,
    waiting_message: "",
    room: null,
    token: null,
  };

  componentDidMount() {
    axios
      .get("/api/rooms/available")
      .then((res) => {
        var rooms = res.data;
        var availability = {};
        rooms.forEach((room) => {
          availability[room["room_name"]] = true;
        });
        this.setState({
          available: rooms.length > 0 ? true : false,
          availability,
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

    this.socket.on("receive token", ({ token, room }) => {
      console.log("Token: " + token);
      this.setState({ token, room });
    });
  }

  onChoiceClick = (choice) => {
    var meetingChoice = this.state.meetingChoice;
    if (meetingChoice === choice) {
      this.setState({ meetingChoice: "" });
    } else {
      this.setState({ meetingChoice: choice });
    }
  };

  onChatStartButtonClick = async (e) => {
    e.preventDefault();
    const { available } = this.state;
    this.setState({ loading: true, waiting_message: "" });
    await new Promise((r) => setTimeout(r, 500));

    if (!available) {
      return;
    } else {
      this.socket.emit("meeting request", {
        subject: this.state.meetingChoice,
      });
      this.setState({ loading: false, waiting: true });
    }
  };

  render() {
    return (
      <div>
        <Transition
          show={this.state.loading}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            style={{
              width: "100%",
              height: "100",
              display: "block",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              left: "50%",
              marginLeft: "-50px",
            }}
          >
            <Loader type="ThreeDots" color="#12B2BA" height="100" width="100" />
          </div>
        </Transition>
        <Transition
          show={!this.state.token}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MeetingChoice
            choice={this.state.meetingChoice}
            onChoiceClick={this.onChoiceClick}
            onChatStartButtonClick={this.onChatStartButtonClick}
            available={this.state.available}
            waiting={this.state.waiting}
            waiting_message={this.state.waiting_message}
          />
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
            room={this.state.room}
            meetingChoice={this.state.meetingChoice}
          />
        </Transition>
      </div>
    );
  }
}

export default MeetingPage;
