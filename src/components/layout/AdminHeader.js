import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Transition from "../transition/Transition";

const NavElement = ({ text, link }) => {
  return (
    <NavLink
      exact
      to={link}
      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      activeClassName="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
    >
      {text}
    </NavLink>
  );
};

const MobileNavElement = ({ text, link, onClickHandler }) => {
  return (
    <NavLink
      onClick={onClickHandler}
      exact
      to={link}
      className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      activeClassName="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
    >
      {text}
    </NavLink>
  );
};

class Navbar extends Component {
  state = {
    dropdown: false,
    mobileMenu: false,
  };

  onClickHandler = () => {
    this.setState((prevState) => ({
      mobileMenu: !prevState.mobileMenu,
    }));
  };

  render() {
    return (
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/">
                  <div className="flex-shrink-0">
                    <img className="w-36" src={Logo} alt="Workflow logo" />
                  </div>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline">
                    <NavElement text="Admin" link="/admin" />
                    <NavElement text="Görüşmeler" link="/admin/meetings" />
                    <NavElement text="Ayarlar" link="/admin/settings" />
                    <NavElement text="Ödeme" link="/admin/payment" />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        onClick={() =>
                          this.setState({
                            dropdown: !this.state.dropdown,
                          })
                        }
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                    <Transition
                      show={this.state.dropdown}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                        style={{
                          display: this.state.dropdown ? "" : "none",
                        }}
                      >
                        <div
                          className="py-1 rounded-md bg-white shadow-xs"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <Link
                            to="/profil"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Profil
                          </Link>
                          <Link
                            to="/profil/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Ayarlar
                          </Link>
                          <Link
                            to="/logout"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Çıkış Yap
                          </Link>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                  onClick={() => {
                    this.setState({ mobileMenu: !this.state.mobileMenu });
                  }}
                >
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                      display: this.state.mobileMenu ? "none" : "block",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                      display: this.state.mobileMenu ? "block" : "none",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="hidden md:hidden"
            style={{
              display: this.state.mobileMenu ? "block" : "none",
            }}
          >
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <MobileNavElement
                onClickHandler={this.onClickHandler}
                text="Admin"
                link="/admin"
              />
              <MobileNavElement
                onClickHandler={this.onClickHandler}
                text="Görüşmeler"
                link="/admin/meetings"
              />
              <MobileNavElement
                onClickHandler={this.onClickHandler}
                text="Ayarlar"
                link="/admin/settings"
              />
              <MobileNavElement
                onClickHandler={this.onClickHandler}
                text="Ödeme"
                link="/admin/payment"
              />
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
                  <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <Link
                  to="/profil"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Profil
                </Link>
                <Link
                  to="/profil/settings"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Ayarlar
                </Link>
                <Link
                  to="/logout"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Çıkış Yap
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
