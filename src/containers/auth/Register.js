import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      password_confirm: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div
        style={{ minHeight: "calc(100vh - 7rem)" }}
        class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-md w-full">
          <div>
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Sigortes.com'a kaydolun
            </h2>
            <p class="mt-4 text-center text-sm leading-5 text-gray-600">
              veya{" "}
              <Link
                to="/login"
                class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                üyeliğiniz varsa giriş yapın.
              </Link>
            </p>
          </div>
          <form class="mt-6" onSubmit={this.onSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  name="name"
                  type="text"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="İsim"
                />
              </div>
              <span className="red-text">{errors.name}</span>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.surname}
                  error={errors.surname}
                  name="surname"
                  type="text"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border-r border-l border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Soyisim"
                />
              </div>
              <span className="red-text">{errors.surname}</span>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  aria-label="Email address"
                  name="email"
                  type="email"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border-r border-l border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="E-posta Adresi"
                />
              </div>
              <span className="red-text">{errors.email}</span>
              <div class="-mt-px">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  name="password"
                  type="password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border-r border-l border-b border-t border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Şifre"
                />
              </div>
              <span className="red-text">{errors.password}</span>
              <div class="-mt-px">
                <input
                  onChange={this.onChange}
                  value={this.state.password_confirm}
                  error={errors.password_confirm}
                  name="password_confirm"
                  type="password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Şifre tekrar"
                />
              </div>
              <span className="red-text">{errors.password_confirm}</span>
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
