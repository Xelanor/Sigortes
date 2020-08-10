import React from "react";

import RequestRow from "./RequestRow";

const MeetingRequests = (props) => {
  return (
    <table class="min-w-full">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            İsim
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Socket
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Konu
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Poliçe Tutarı
          </th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
          <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        {props.requests.map((request) => {
          return (
            <RequestRow
              key={request.socket}
              request={request}
              accept={props.accept}
              deny={props.deny}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default MeetingRequests;
