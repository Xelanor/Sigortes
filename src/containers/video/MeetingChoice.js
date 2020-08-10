import React from "react";
import Transition from "../../components/transition/Transition";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import { useMediaQuery } from "react-responsive";

const ChoiceBox = (props) => {
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 768px)" });
  return (
    <div
      onClick={() => props.onChoiceClick(props.subject)}
      className={classNames({
        "flex flex-col items-center justify-center p-2 h-20 w-20 md:h-40 md:w-48 border border-gray-300 shadow-xl rounded-lg relative hover:border-sigortes cursor-pointer select-none": true,
        "bg-white text-sigortes": props.choice !== props.subject,
        "bg-sigortes text-white": props.choice === props.subject,
      })}
    >
      <Icon style={isBigScreen ? { fontSize: 40 } : { fontSize: 25 }}>
        {props.icon}
      </Icon>
      <div className="text-lg md:text-3xl break-words text-center font-medium -mb-2">
        {props.primary}
      </div>
      <div className="text-lg md:text-3xl break-words text-center font-medium">
        {props.secondary}
      </div>
    </div>
  );
};

const MeetingChoice = (props) => {
  return (
    <div className="bg-gray-50">
      <div
        style={{ minHeight: "calc(100vh - 6.6rem)" }}
        className="max-w-7xl flex flex-col mx-auto py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-3xl text-center text-sigortes font-semibold my-8">
          Hangi konuda destek almak istersiniz?
        </div>
        <div className="flex justify-evenly mb-4">
          <ChoiceBox
            choice={props.choice}
            subject="car"
            primary="Aracım"
            secondary="İçin"
            icon="directions_car"
            onChoiceClick={props.onChoiceClick}
          />
          <ChoiceBox
            choice={props.choice}
            subject="house"
            primary="Evim"
            secondary="İçin"
            icon={"home"}
            onChoiceClick={props.onChoiceClick}
          />
          <ChoiceBox
            choice={props.choice}
            subject="health"
            primary="Sağlığım"
            secondary="İçin"
            icon={"local_hospital"}
            onChoiceClick={props.onChoiceClick}
          />
          <ChoiceBox
            choice={props.choice}
            subject="other"
            primary="Genel"
            secondary="Bilgi"
            icon={"help"}
            onChoiceClick={props.onChoiceClick}
          />
        </div>
        <Transition
          show={props.choice !== ""}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-30"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="flex flex-col items-center">
            <button
              disabled={!props.available || props.waiting}
              onClick={props.onChatStartButtonClick}
              className={classNames({
                "bg-sigortes text-white font-medium text-xl px-4 py-1 w-full md:w-56 rounded-lg cursor-pointer": true,
                "opacity-50": !props.available || props.waiting,
              })}
            >
              Görüşmeyi Başlat
            </button>
            <Transition
              show={props.waiting}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-30"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="flex flex-col max-w-xl">
                <div className="text-lg mt-2">
                  Talebiniz Müşteri Temsilcimiz tarafından alınmıştır. En kısa
                  zamanda canlı görüşmeniz başlayacaktır.
                </div>
                <div className="text-lg my-2">Teşekkür ederiz.</div>
              </div>
            </Transition>
            <Transition
              show={!props.available}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-30"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="flex flex-col max-w-xl">
                <div className="text-lg mt-2">
                  Şu anda bütün müşteri temsilcilerimiz başka misafirlerimize
                  destek olmaktadır. Lütfen kısa bir süre bekleyiniz.
                </div>
                <div className="text-lg my-2">
                  Bu sırada aşağıdaki linklerden poliçeniz ile ilgili detaylı
                  bilgi alabilirsiniz.
                </div>
                <div className="text-sm text-red-600">
                  Canlı destek çalışma saatlerimiz: Hafta içi 09:00 - 17:00
                </div>
              </div>
            </Transition>
            <Transition
              show={props.waiting_message !== ""}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-30"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="flex flex-col max-w-xl bg-red-500 mt-4 p-2">
                <div className="text-lg text-white text-center mb-1">
                  Canlı destek talebiniz reddedilmiştir.
                </div>
                <div className="text-lg text-white text-center">
                  Lütfen daha sonra tekrar deneyiniz.
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default MeetingChoice;
