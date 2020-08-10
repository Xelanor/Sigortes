import React from "react";
import styled from "styled-components";

const InsuranceBox = styled.div`
  cursor: pointer;
  transition: all 0.5s ease;
  height: 110px;
  @media (max-width: 768px) {
    height: 48px;
  }
`;

const InsuranceImg = styled.img`
  max-width: 80%;
  filter: grayscale(100%);
  opacity: 0.25;
  transition: all 0.3s ease;
  :hover {
    opacity: 1;
    filter: grayscale(0%);
  }
`;

const InsuranceCompanyBox = (props) => {
  return (
    <div className="w-1/4 p-2">
      <InsuranceBox className="flex justify-center items-center hover:shadow-lg">
        <InsuranceImg
          className="m-4"
          src={props.image}
          alt="insurance-company"
        />
      </InsuranceBox>
    </div>
  );
};

export default InsuranceCompanyBox;
