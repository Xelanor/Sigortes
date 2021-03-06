import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      errors: {},
      success: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
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
    if (nextProps.auth.password_changed) {
      this.setState({
        success: {
          text:
            "Şifreniz başarıyla değiştirilmiştir. Tekrar giriş yapabilirsiniz.",
        },
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      password: this.state.password,
      token: this.props.match.params.token,
    };
    this.props.resetPassword(userData);
  };

  render() {
    const { errors, success } = this.state;
    return (
      <div
        style={{ minHeight: "calc(100vh - 4rem)" }}
        class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-md w-full">
          <div>
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Lütfen yeni bir şifre belirleyin
            </h2>
          </div>
          <form class="mt-6" onSubmit={this.onSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  name="password"
                  type="password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Yeni Şifreniz"
                />
              </div>
              <span className="red-text">{errors.token}</span>
              <span className="red-text">{errors.password}</span>
              <span className="green-text">{success.text}</span>
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
                Şifremi Belirle
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { resetPassword })(ResetPassword);
