import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const NewMessage = (props: Props) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    console.log(text);
    setText("");
  };

  return (
    <div className="flex flex-row items-center max-h-fit w-full m-2 px-2 rounded-md border">
      <button className="bg-perfLightGray p-1 rounded-sm">
        <AppIcons className="w-5 font-light" icon="PlusIcon:outline" />
      </button>
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        placeholder="Your message"
        borderColor="#fff"
      />
      <button
        className="w-24 bg-perfLightGray py-1 ml-1 rounded-sm"
        onClick={handleClick}
      >
        Send{" "}
        <AppIcons
          className="inline w-4 pb-2 ml-2 rotate-320"
          icon="PaperAirplaneIcon:solid"
        />{" "}
      </button>
    </div>
  );
};

export default NewMessage;
