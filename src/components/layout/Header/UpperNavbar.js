import React, { Component } from "react";
import { Link } from "react-router-dom";

class UpperNavbar extends Component {
  state = {};
  render() {
    return (
      <nav className="bg-gray-800 border-b border-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:justify-start items-center h-10">
            <div className="text-white font-medium text-xs md:text-sm mr-4">
              Canlı görüşme ile poliçenizi hazırlayalım
            </div>
            <Link to="/video-gorusme">
              <div className="px-3 py-1 rounded-md text-xs md:text-sm font-medium text-gray-100 bg-red-500 focus:outline-none hover:bg-red-600">
                Hemen Dene!
              </div>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default UpperNavbar;
