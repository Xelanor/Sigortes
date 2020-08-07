import React, { Component } from "react";
import { CallEnd, Mic, Videocam } from "@material-ui/icons";

class VideoMeeting extends Component {
  state = {};
  render() {
    return (
      <div className="max-w-screen-xl flex flex-col mx-auto mt-4">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="text-3xl font-medium text-gray-900 mb-4">
            Berke bey
          </div>
          <div
            className="w-1/2"
            style={{
              height: 400,
              backgroundColor: "grey",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 192,
                height: 108,
                top: 15,
                right: 15,
                backgroundColor: "blue",
                position: "absolute",
              }}
            ></div>
            <div
              className="flex justify-center w-full"
              style={{ bottom: 20, position: "absolute" }}
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
      </div>
    );
  }
}

export default VideoMeeting;
