import React, { Component } from "react";
import Video from "twilio-video";
import { DirectionsCar, Home, LocalHospital } from "@material-ui/icons";
import classNames from "classnames";

import Participant from "../../components/video/ParticipantVideo";
import VideoControls from "../../components/video/VideoControls";
import VideoChat from "../../components/video/VideoChat";

class VideoMeeting extends Component {
  state = {
    messages: [],
    room: null,
    participant: null,
    muted: false,
    videoCam: true,
    form: {
      meetingChoice: "",
      name: "",
      surname: "",
    },
  };

  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      this.state.room.disconnect();
    });

    this.props.socket.on("filling-form", (form) => {
      this.setState({ form });
    });

    const participantConnected = (participant) => {
      this.setState({ participant });
    };

    const participantDisconnected = (participant) => {
      console.log(`Participant ${participant} Disconnected`);
      this.setState({ participant: null });
    };

    Video.connect(this.props.token, {
      name: this.props.room,
    }).then((room) => {
      this.setState({ room });
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.on("disconnected", (room) => {
        this.props.handleLogout();
      });
      room.participants.forEach(participantConnected);
    });

    this.props.socket.on("chat-message", (message) => {
      let messages = [...this.state.messages];
      messages.push(message);
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    var currentRoom = this.state.room;
    if (currentRoom && currentRoom.localParticipant.state === "connected") {
      currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
        trackPublication.track.stop();
      });
      currentRoom.disconnect();
      return null;
    } else {
      return currentRoom;
    }
  }

  onMuteButtonClick = () => {
    if (this.state.muted) {
      this.setState({ muted: false });
      this.state.room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
    } else {
      this.setState({ muted: true });
      this.state.room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
    }
  };

  onVideocamButtonClick = () => {
    if (this.state.videoCam) {
      this.setState({ videoCam: false });
      this.state.room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
    } else {
      this.setState({ videoCam: true });
      this.state.room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
    }
  };

  onChangeTextMessage = (e) => {
    this.setState({ textMessage: e.target.value });
  };

  onSendChatMessage = () => {
    if (this.state.textMessage !== "") {
      const message = {
        name: this.props.socket.id,
        text: this.state.textMessage,
        date: Date.now(),
      };
      let messages = [...this.state.messages];
      messages.push(message);
      this.props.socket.emit("send-message", {
        message,
        room: this.props.room,
      });
      this.setState({ messages, textMessage: "" });
    }
  };

  render() {
    let myVideo;
    if (this.state.room) {
      myVideo = (
        <Participant
          key={this.state.room.localParticipant.sid}
          participant={this.state.room.localParticipant}
        />
      );
    }

    let guestVideo;
    if (this.state.participant) {
      guestVideo = (
        <Participant
          key={this.state.participant.sid}
          participant={this.state.participant}
        />
      );
    }

    return (
      <div
        style={{ minHeight: "calc(100vh - 6.5rem)" }}
        className="flex mx-auto p-4 bg-gray-900 w-full"
      >
        <div className="w-full flex flex-col xl:w-2/5 mb-4">
          <div
            style={{
              width: "100%",
              backgroundColor: "grey",
              position: "relative",
              lineHeight: 0,
              fontSize: 0,
            }}
          >
            {guestVideo}
            <div
              style={{
                width: 200,
                top: 15,
                right: 15,
                backgroundColor: "blue",
                position: "absolute",
              }}
            >
              {myVideo}
            </div>
          </div>
          <VideoControls
            muted={this.state.muted}
            onMuteButtonClick={this.onMuteButtonClick}
            videoCam={this.state.videoCam}
            onVideocamButtonClick={this.onVideocamButtonClick}
            logout={this.props.handleLogout}
          />
        </div>
        <div className="w-full flex flex-col xl:w-1/5 ml-6">
          <VideoChat
            messages={this.state.messages}
            textMessage={this.state.textMessage}
            onChangeTextMessage={this.onChangeTextMessage}
            sendMessage={this.onSendChatMessage}
          />
        </div>
        <div className="w-full xl:w-2/5 flex flex-col ml-6 mr-2 bg-gray-100 py-4 flex-grow overflow-y-auto">
          <div className="flex justify-center">
            <div className="flex mb-4">
              <div
                className={classNames({
                  "flex flex-col items-center justify-center h-40 w-48 rounded-lg mr-16 cursor-pointer select-none": true,
                  "bg-white text-sigortes":
                    this.state.form.meetingChoice !== "car",
                  "bg-sigortes text-white":
                    this.state.form.meetingChoice === "car",
                })}
              >
                <DirectionsCar style={{ fontSize: 40 }} />
                <div className="text-3xl break-words text-center font-medium -mb-2">
                  Aracım
                </div>
                <div className="text-3xl break-words text-center font-medium">
                  İçin
                </div>
              </div>
              <div
                className={classNames({
                  "flex flex-col items-center justify-center h-40 w-48 rounded-lg mr-16 cursor-pointer select-none": true,
                  "bg-white text-sigortes":
                    this.state.form.meetingChoice !== "house",
                  "bg-sigortes text-white":
                    this.state.form.meetingChoice === "house",
                })}
              >
                <Home style={{ fontSize: 40 }} />
                <div className="text-3xl break-words text-center font-medium -mb-2">
                  Evim
                </div>
                <div className="text-3xl break-words text-center font-medium">
                  İçin
                </div>
              </div>
              <div
                className={classNames({
                  "flex flex-col items-center justify-center h-40 w-48 rounded-lg cursor-pointer select-none": true,
                  "bg-white text-sigortes":
                    this.state.form.meetingChoice !== "health",
                  "bg-sigortes text-white":
                    this.state.form.meetingChoice === "health",
                })}
              >
                <LocalHospital style={{ fontSize: 40 }} />
                <div className="text-3xl break-words text-center font-medium -mb-2">
                  Sağlığım
                </div>
                <div className="text-3xl break-words text-center font-medium">
                  İçin
                </div>
              </div>
            </div>
          </div>
          <form className="w-full max-w-lg mx-auto">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  Adınız
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="name"
                  type="text"
                  placeholder="Kerem"
                  value={this.state.form.name}
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Soyadınız
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="surname"
                  type="text"
                  placeholder="Yılmaz"
                  value={this.state.form.surname}
                ></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default VideoMeeting;
