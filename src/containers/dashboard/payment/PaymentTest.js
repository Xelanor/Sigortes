import React, { Component } from "react";
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Loader from "react-loader-spinner";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "../../../utils/paymentFormatter";

class Payment extends Component {
  state = {
    number: "",
    expiry: "",
    cvc: "",
    focus: "",
    name: "",
    page: "card",
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value);
    }

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      page: "loading",
    });
    const values = {
      price: "1200",
      number: this.state.number.replace(/\s/g, ""),
      expiry: this.state.expiry,
      cvc: this.state.cvc,
      name: this.state.name,
    };
    axios
      .post("/api/payment/test", values)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          this.setState({ page: "success" });
        } else {
          this.setState({ page: "failure" });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ page: "card" });
      });
  };

  render() {
    let page;
    switch (this.state.page) {
      case "loading":
        page = (
          <div
            style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader type="ThreeDots" color="#12B2BA" height="100" width="100" />
          </div>
        );
        break;
      case "success":
        page = (
          <div className="flex justify-start items-center max-w-lg w-full mt-4 font-medium py-1 px-2 rounded-md text-green-100 bg-green-700 border border-green-700 ">
            <div slot="avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check-circle w-5 h-5 mx-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="text-xl font-normal  ml-2 max-w-full flex-initial">
              <div className="py-2">
                Ödemeniz başarıyla alınmıştır
                <div className="text-sm font-base">
                  Detaylar e-posta ile gönderilmiştir. Teşekkür ederiz...
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "failure":
        page = (
          <>
            <div
              onClick={() => this.setState({ page: "card" })}
              className="flex justify-start items-center max-w-lg w-full mt-4 font-medium py-1 px-2 cursor-pointer"
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16px"
                height="16px"
                viewBox="0 0 612 612"
                className="mr-2"
              >
                <g>
                  <g id="_x37__42_">
                    <g>
                      <path
                        d="M535.5,0h-459C34.253,0,0,34.253,0,76.5v459C0,577.747,34.253,612,76.5,612h459c42.247,0,76.5-34.253,76.5-76.5v-459
				C612,34.253,577.747,0,535.5,0z M573.75,535.5c0,21.114-17.117,38.25-38.25,38.25h-459c-21.133,0-38.25-17.136-38.25-38.25v-459
				c0-21.133,17.117-38.25,38.25-38.25h459c21.133,0,38.25,17.117,38.25,38.25V535.5z M420.75,286.875H218.293l78.814-78.814
				c7.478-7.478,7.478-19.584,0-27.043c-7.478-7.478-19.584-7.478-27.043,0l-108.19,108.19c-4.571,4.571-6.005,10.863-4.954,16.792
				c-1.052,5.929,0.383,12.221,4.973,16.811l108.19,108.19c7.478,7.478,19.584,7.478,27.043,0s7.478-19.584,0-27.043l-78.833-78.833
				H420.75c10.557,0,19.125-8.568,19.125-19.125C439.875,295.443,431.307,286.875,420.75,286.875z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              Geri Dön
            </div>
            <div className="flex justify-start items-center max-w-lg w-full mt-2 font-medium py-1 px-2 rounded-md text-red-100 bg-red-700 border border-red-700 ">
              <div slot="avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-alert-octagon w-5 h-5 mx-2"
                >
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="text-xl font-normal  ml-2 max-w-full flex-initial">
                <div className="py-2">
                  Ödemenizi alırken bir hatayla karşılaştık
                  <div className="text-sm font-base">
                    Lütfen kredi kartı bilgilerinizi kontrol edip tekrar
                    deneyin...
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => this.setState({ page: "card" })}
              className="flex justify-start items-center max-w-lg w-full mt-4 font-medium py-1 px-2 cursor-pointer"
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16px"
                height="16px"
                viewBox="0 0 612 612"
                className="mr-2"
              >
                <g>
                  <g id="_x37__42_">
                    <g>
                      <path
                        d="M535.5,0h-459C34.253,0,0,34.253,0,76.5v459C0,577.747,34.253,612,76.5,612h459c42.247,0,76.5-34.253,76.5-76.5v-459
				C612,34.253,577.747,0,535.5,0z M573.75,535.5c0,21.114-17.117,38.25-38.25,38.25h-459c-21.133,0-38.25-17.136-38.25-38.25v-459
				c0-21.133,17.117-38.25,38.25-38.25h459c21.133,0,38.25,17.117,38.25,38.25V535.5z M420.75,286.875H218.293l78.814-78.814
				c7.478-7.478,7.478-19.584,0-27.043c-7.478-7.478-19.584-7.478-27.043,0l-108.19,108.19c-4.571,4.571-6.005,10.863-4.954,16.792
				c-1.052,5.929,0.383,12.221,4.973,16.811l108.19,108.19c7.478,7.478,19.584,7.478,27.043,0s7.478-19.584,0-27.043l-78.833-78.833
				H420.75c10.557,0,19.125-8.568,19.125-19.125C439.875,295.443,431.307,286.875,420.75,286.875z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              Geri Dön
            </div>
          </>
        );
        break;
      case "card":
        page = (
          <div className="max-w-md w-full mt-8">
            <div id="PaymentForm">
              <div className="mb-6">
                <Cards
                  cvc={this.state.cvc}
                  expiry={this.state.expiry}
                  focused={this.state.focus}
                  name={this.state.name}
                  number={this.state.number}
                  callback={this.handleCallback}
                />
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="rounded-md shadow-sm">
                  <div>
                    <input
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      value={this.state.number}
                      pattern="[\d| ]{19,22}"
                      name="number"
                      type="tel"
                      required
                      className="appearance-none rounde d-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                      placeholder="Card Number"
                    />
                  </div>
                  <div className="-mt-px">
                    <input
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      value={this.state.name}
                      name="name"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex">
                    <div className="-mt-px w-full">
                      <input
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        value={this.state.expiry}
                        pattern="\d\d/\d\d"
                        name="expiry"
                        type="tel"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border-l border-b border-t border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                        placeholder="Valid Thru"
                      />
                    </div>
                    <div className="-mt-px w-full">
                      <input
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        value={this.state.cvc}
                        pattern="\d{3,4}"
                        name="cvc"
                        type="tel"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-br-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
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
                            fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      Ödeme Yap
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
        break;
      default:
        page = <div>Default</div>;
    }
    return (
      // TODO: Forma adres bölümü
      <div
        style={{ minHeight: "calc(100vh - 4rem)" }}
        className="flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col w-full items-center">
          <div className="max-w-lg w-full">
            <div className="border-t border-b border-gray-300">
              <div className="my-2 px-1 flex justify-between items-center">
                <div className="text-xl leading-7 text-gray-500">Senelik</div>
                <div className="text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                  1200 TL
                </div>
              </div>
            </div>
          </div>
          {page}
        </div>
      </div>
    );
  }
}

export default Payment;
