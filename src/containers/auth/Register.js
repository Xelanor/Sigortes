import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

function Register(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});

  let history = useHistory();

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      history.push("/profil");
    }
  });

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      surname,
      email,
      password,
      password_confirm: passwordConfirm,
    };
    props.registerUser(newUser, history);
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 7rem)" }}
      className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sigortes.com'a kaydolun
          </h2>
          <p className="mt-4 text-center text-sm leading-5 text-gray-600">
            veya{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              üyeliğiniz varsa giriş yapın.
            </Link>
          </p>
        </div>
        <form className="mt-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={errors.name}
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="İsim"
              />
            </div>
            <span className="red-text">{errors.name}</span>
            <div>
              <input
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                error={errors.surname}
                name="surname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-r border-l border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Soyisim"
              />
            </div>
            <span className="red-text">{errors.surname}</span>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={errors.email}
                aria-label="Email address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-r border-l border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="E-posta Adresi"
              />
            </div>
            <span className="red-text">{errors.email}</span>
            <div className="-mt-px">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={errors.password}
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border-r border-l border-b border-t border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Şifre"
              />
            </div>
            <span className="red-text">{errors.password}</span>
            <div className="-mt-px">
              <input
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                error={errors.password_confirm}
                name="password_confirm"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Şifre tekrar"
              />
            </div>
            <span className="red-text">{errors.password_confirm}</span>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
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
