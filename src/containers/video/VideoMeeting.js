import React, { Component } from "react";
import {
  CallEnd,
  Mic,
  Videocam,
  DirectionsCar,
  Home,
  LocalHospital,
} from "@material-ui/icons";
import classNames from "classnames";

class VideoMeeting extends Component {
  state = {
    form: {
      meetingChoice: "",
      name: "",
      surname: "",
    },
  };

  componentDidMount() {
    var form = this.state.form;
    form.meetingChoice = this.props.meetingChoice;
    this.setState({ form });
  }

  onChoiceClick = (choice) => {
    var form = this.state.form;
    var meetingChoice = form.meetingChoice;
    if (meetingChoice === choice) {
      form.meetingChoice = "";
      this.setState({ form });
      this.props.socket.emit("fill-form", { form, room: this.props.room });
    } else {
      form.meetingChoice = choice;
      this.setState({ form });
      this.props.socket.emit("fill-form", { form, room: this.props.room });
    }
  };

  onChange = (e) => {
    var form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form });
    this.props.socket.emit("fill-form", { form, room: this.props.room });
  };

  render() {
    return (
      <div
        style={{ minHeight: "calc(100vh - 6.5rem)" }}
        className="flex mx-auto p-4 bg-gray-900"
      >
        <div className="">
          {/* <div className="text-3xl font-medium text-gray-900 mb-4">
            Berke bey
          </div> */}
          <div
            style={{
              width: 800,
              backgroundColor: "grey",
              position: "relative",
              lineHeight: 0,
              fontSize: 0,
            }}
          >
            <div
              style={{
                width: 200,
                top: 15,
                right: 15,
                backgroundColor: "blue",
                position: "absolute",
              }}
            ></div>
            <div
              className="flex justify-center w-full"
              style={{ bottom: 10, position: "absolute" }}
            >
              <div
                className="flex justify-center items-center rounded-full p-5 mr-4"
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "blue",
                }}
              >
                <Mic style={{ color: "white" }} />
              </div>
              <div
                className="flex justify-center items-center rounded-full p-5 mr-4"
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "red",
                }}
              >
                <CallEnd style={{ color: "white" }} />
              </div>
              <div
                className="flex justify-center items-center rounded-full p-5"
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "blue",
                }}
              >
                <Videocam style={{ color: "white" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mx-12 bg-gray-100 py-4">
          <div className="flex justify-center">
            <div className="flex mb-4">
              <div
                onClick={() => this.onChoiceClick("car")}
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
                onClick={() => this.onChoiceClick("house")}
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
                onClick={() => this.onChoiceClick("health")}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
