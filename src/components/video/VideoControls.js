import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const MainControlsBlock = styled.div`
  background-color: #1d273b;
  padding: 5px;
  height: 70px;
`;

const MainControlsButton = styled.div`
  :hover {
    background-color: #2d3a54;
    border-radius: 5px;
  }
`;

const VideoControls = (props) => {
  return (
    <MainControlsBlock className="flex justify-between text-white">
      <div className="flex">
        <MainControlsButton
          onClick={props.onMuteButtonClick}
          className="flex flex-col justify-center items-center px-3 py-2 cursor-pointer"
          style={{ minWidth: 80 }}
        >
          <FontAwesomeIcon
            icon={props.muted ? faMicrophoneSlash : faMicrophone}
            size="lg"
            className={classNames({
              "text-red-400": props.muted,
            })}
          />
          <div>{props.muted ? "Sesi Aç" : "Sustur"}</div>
        </MainControlsButton>
        <MainControlsButton
          onClick={props.onVideocamButtonClick}
          className="flex flex-col justify-center items-center px-3 py-2 cursor-pointer"
          style={{ minWidth: 80 }}
        >
          <FontAwesomeIcon
            icon={props.videoCam ? faVideo : faVideoSlash}
            size="lg"
            className={classNames({
              "text-red-400": !props.videoCam,
            })}
          />
          <div>{props.videoCam ? "Görüntümü Kapat" : "Görüntümü Aç"}</div>
        </MainControlsButton>
      </div>
      <div className="flex">
        <MainControlsButton
          onClick={props.logout}
          className="flex flex-col justify-center items-center px-3 py-2 cursor-pointer"
          style={{ minWidth: 80 }}
        >
          <div className="text-red-400">Görüşmeyi Sonlandır</div>
        </MainControlsButton>
      </div>
    </MainControlsBlock>
  );
};

export default VideoControls;
