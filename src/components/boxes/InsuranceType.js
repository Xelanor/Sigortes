import React from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

const InsuranceIcon = styled(Icon)`
  font-size: 50px !important;
  @media (max-width: 768px) {
    font-size: 30px !important;
  }
`;

const InsuranceType = (props) => {
  return (
    <div className="w-1/3 md:w-1/5 p-1 md:p-2">
      <div className="bg-white border border-gray-300 shadow-xl rounded-lg relative hover:border-sigortes cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <InsuranceIcon className="text-sigortes mt-4">
            {props.icon}
          </InsuranceIcon>
          <div className="text-sigortes text-xs md:text-lg px-1 md:px-2 pb-4 break-words text-center font-medium hover:underline">
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceType;
