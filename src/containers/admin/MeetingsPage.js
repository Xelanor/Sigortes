import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";

const MeetingRow = ({ meeting }) => {
  return (
    <tr>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {meeting.sid}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {meeting.status}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        <Moment format="DD/MM/YYYY HH:mm">{meeting.dateCreated}</Moment>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        <Moment format="DD/MM/YYYY HH:mm">{meeting.endTime}</Moment>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {meeting.duration}sn
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {meeting.uniqueName}
      </td>
    </tr>
  );
};

class MeetingsPage extends Component {
  state = {
    meetings: null,
  };

  componentDidMount() {
    axios.get("/api/video/meetings").then((res) => {
      this.setState({ meetings: res.data });
    });
  }
  render() {
    return (
      <div class="max-w-screen-xl flex flex-col mx-auto mt-4">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Sid
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Başlangıç Tarihi
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Bitiş Tarihi
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Süre
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Oda İsmi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {!this.state.meetings ? (
                  <h1>Yok</h1>
                ) : (
                  this.state.meetings.map((meeting) => {
                    return <MeetingRow meeting={meeting} />;
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetingsPage;
