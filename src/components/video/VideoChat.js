import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const MainBlock = styled.div`
  background-color: #1d273b;
  padding: 15px;
  // max-height: calc(100vh - 6.5rem);
  max-height: 600px;
`;

const MessageBlock = styled.div`
  margin-bottom: 10px;
`;

const MessageSender = styled.div`
  line-height: 20px;
`;

const MessageText = styled.div``;

const TextArea = styled.div`
  height: 70px;
  background-color: #1d273b;
`;

const VideoChat = (props) => {
  return (
    <>
      <MainBlock className="overflow-y-auto flex-grow">
        <div className="text-center text-white font-bold mb-4">Chat</div>
        {props.messages.map((message) => {
          return (
            <MessageBlock>
              <div className="flex items-end">
                <MessageSender className="text-gray-100 font-semibold text-base mr-2">
                  {message.name}
                </MessageSender>
                <Moment className="text-gray-300 text-xs" format="HH:mm">
                  {message.date}
                </Moment>
              </div>
              <MessageText className="text-white text-sm">
                {message.text}
              </MessageText>
            </MessageBlock>
          );
        })}
        <div id="last-message"></div>
      </MainBlock>
      <TextArea className="flex justify-center items-center p-4">
        <input
          type="text"
          value={props.textMessage}
          onChange={props.onChangeTextMessage}
          className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
          placeholder="Mesaj..."
        />
        <div
          onClick={() => {
            props.sendMessage();
          }}
          className="h-full border border-gray-900 bg-gray-900 px-3 py-2 text-white cursor-pointer select-none"
        >
          Gönder
        </div>
      </TextArea>
    </>
  );
};

export default VideoChat;
