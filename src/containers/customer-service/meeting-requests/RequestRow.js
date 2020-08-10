import React from "react";

const RequestRow = ({ request, accept, deny }) => {
  return (
    <tr>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {request.name}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {request.socket}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        {request.subject}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        12000TL
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        <button
          className="bg-green-500 px-2 py-1 text-white"
          onClick={() => accept(request.socket, request.name)}
        >
          Kabul Et
        </button>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => deny(request.socket)}
        >
          Reddet
        </button>
      </td>
    </tr>
  );
};

export default RequestRow;
