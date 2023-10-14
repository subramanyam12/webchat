import React from "react";
import Dateconvert from "./Dateconvert";
const Message = ({ person, msg, currentDate }) => {

  return (
    <div
      className={`w-full mb-3 flex flex-col gap-1 ${
        person ? "send" : "receive"
      }`}
    >
      <p className="text-sm max-w-[50vh] max-sm:max-w-[75vw] max-sm:py-2 max-sm:text-base py-1 px-3 relative">
        {msg}
      </p>
      <small className="text-gray-400 scale-95 text-xs">
      <Dateconvert currentDate={currentDate} />
      </small>
    </div>
  );
};

export default Message;
