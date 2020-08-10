import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserInjured,
  faCarCrash,
  faChevronRight,
  faTags,
  faFileArchive,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

import TurkLira from "../../assets/turklira.png";
import Aksigorta from "../../assets/InsuranceCompanies/aksigorta.png";
import Allianz from "../../assets/InsuranceCompanies/allianz.png";
import Anadolusigorta from "../../assets/InsuranceCompanies/anadolusigorta.png";
import Axa from "../../assets/InsuranceCompanies/axa.png";
import Groupama from "../../assets/InsuranceCompanies/groupama.png";
import Mapfre from "../../assets/InsuranceCompanies/mapfre.png";
import Sompojapan from "../../assets/InsuranceCompanies/sompojapan.png";
import Unico from "../../assets/InsuranceCompanies/unico.png";
import CarCrash from "../../assets/car-crash.png";

import InsuranceType from "../boxes/InsuranceType";
import InsuranceCompanyBox from "../boxes/InsuranceCompanyBox";

const FirstContainer = styled.div`
  height: 400px;
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const BigTitle = styled.div`
  font-size: 90px;
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const DiscountBox = styled.div`
  box-shadow: 3px 6px 18px 1px rgba(0, 0, 0, 0.09);
`;

class Homepage extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="py-8 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <FirstContainer className="flex w-full">
              <div className="flex flex-col justify-between md:w-2/3">
                <div>
                  <div className="font-semibold text-blue-900 text-base md:text-3xl">
                    Zamandan tasarruf. Evrak işlerinden tasarruf.
                  </div>
                  <BigTitle className="font-bold text-blue-900 -ml-1">
                    Paradan tasarruf.
                  </BigTitle>
                </div>
                <div className="flex font-semibold text-blue-900 text-base md:text-xl">
                  En değer verdiğiniz şeyleri; doğru fiyata, zahmetsizce
                  koruyun.
                </div>
              </div>
              <div className="md:flex md:w-1/3 hidden">
                <img className="h-full" src={TurkLira} alt="dollar" />
              </div>
            </FirstContainer>
            <div className="flex flex-wrap mt-8 -mx-2 justify-center">
              <InsuranceType text="Ev Sigortası" icon="home" />
              <InsuranceType text="Araç Sigortası" icon="directions_car" />
              <InsuranceType text="Sağlık Sigortası" icon="local_hospital" />
              <InsuranceType text="Seyahat Sigortası" icon="flight_takeoff" />
              <InsuranceType text="Trafik Sigortası" icon="traffic" />
            </div>
          </div>
        </div>
        <div className="py-4 md:py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 pr-4">
                <img className="" src={CarCrash} alt="dollar" />
              </div>
              <div className="md:w-3/5 flex flex-col pl-4">
                <div className="text-lg md:text-2xl leading-7 font-medium mb-6 mt-4 md:mt-0">
                  Araç Sigortanızın kapsadığı bazı durumlar
                </div>
                <div className="flex items-center py-1">
                  <div className="pr-2 w-8">
                    <FontAwesomeIcon icon={faUserInjured} size="sm" />
                  </div>
                  <div className="text-lg pl-2 leading-5">
                    Size veya bir başkasına gelen zararlar
                  </div>
                </div>
                <div className="flex items-center py-1">
                  <div className="pr-2 w-8">
                    <FontAwesomeIcon icon={faCarCrash} size="sm" />
                  </div>
                  <div className="text-lg pl-2 leading-5">
                    Başkasının arabasına verilen hasarlar
                  </div>
                </div>
                <div className="flex items-center py-1 mb-6">
                  <div className="flex -mb-1 pr-2 w-8 items-center">
                    <Icon style={{ fontSize: 18 }}>electric_car</Icon>
                  </div>
                  <div className="text-lg pl-2 leading-5">
                    Kendi arabanızda oluşan hasarlar
                  </div>
                </div>
                <div className="text-lg font-medium mb-4">
                  Sigortanızı sizin için özelleştiriyoruz, bu sayede sadece
                  ihtiyacınız olanı ödeyeceksiniz.
                </div>
                <div className="flex items-center py-1">
                  <div className="text-lg text-blue-600 mb-6 cursor-pointer hover:underline">
                    Tüm araç sigortalarını incele
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="text-blue-600"
                      size="xs"
                      className="ml-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 md:py-8 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-lg md:text-2xl font-medium text-center mb-6">
              Tasarruf yapmanız için size özel indirimler
            </div>
            <DiscountBox className="md:flex justify-center">
              <div className="flex flex-col w-full items-center justify-center border-r-0 border-b md:border-r md:border-b-0 border-gray-300 text-center">
                <div className="pt-15 px-6 pb-10 items-center flex-grow flex flex-col">
                  <div className="t-0 w-1/3">
                    <FontAwesomeIcon icon={faTags} size="4x" />
                  </div>
                  <div className="text-lg md:text-2xl my-6 font-bold text-center">
                    Online İndirim
                  </div>
                  <div className="text-sm md:text-lg text-center">
                    Online düzenlenen poliçelerde %15'e varan indirimler
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-center justify-center border-r-0 border-b md:border-r md:border-b-0 border-gray-300 text-center">
                <div className="pt-15 px-6 pb-10 items-center flex-grow flex flex-col">
                  <div className="t-0 w-1/3">
                    <FontAwesomeIcon icon={faFileArchive} size="4x" />
                  </div>
                  <div className="text-lg md:text-2xl my-6 font-bold text-center">
                    Birlikte al - kazan
                  </div>
                  <div className="text-sm md:text-lg text-center">
                    Ev ve taşıt sigortalarında birlikte alımlarda 800TL'ye varan
                    indirim kazan
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-center justify-center text-center">
                <div className="pt-15 px-6 pb-10 items-center flex-grow flex flex-col">
                  <div className="t-0 w-1/3">
                    <FontAwesomeIcon icon={faProjectDiagram} size="4x" />
                  </div>
                  <div className="text-lg md:text-2xl my-6 font-bold text-center">
                    Yenilemede İndirim
                  </div>
                  <div className="text-sm md:text-lg text-center">
                    2. yıl poliçe yenilemelerinde %30'a varan indirim kazan
                  </div>
                </div>
              </div>
            </DiscountBox>
          </div>
        </div>
        <div className="py-4 md:py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-lg md:text-2xl font-bold text-center">
              Anlaşmalı Sigorta Şirketlerimiz
            </div>
            <div className="flex flex-wrap">
              <InsuranceCompanyBox image={Aksigorta} />
              <InsuranceCompanyBox image={Allianz} />
              <InsuranceCompanyBox image={Anadolusigorta} />
              <InsuranceCompanyBox image={Axa} />
              <InsuranceCompanyBox image={Groupama} />
              <InsuranceCompanyBox image={Mapfre} />
              <InsuranceCompanyBox image={Sompojapan} />
              <InsuranceCompanyBox image={Unico} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Homepage;
