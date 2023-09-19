import classNames from "classnames";
import React from "react";

type Props = {
  checked: string;
  setChecked: any;
  type: string;
};

const SwitchButton = ({ checked, setChecked, type }: Props) => {
  return (
    <button
      className={classNames(
        " text-xs sm:text-sm p-1 md:px-2 border border-perfBlue rounded-md ",
        {
          "text-white bg-perfBlue ": checked === type,
          "text-perfBlue hover:text-white hover:bg-perfBlue": checked !== type,
        }
      )}
      onClick={() => setChecked(type)}
    >
      {type}
    </button>
  );
};

export default SwitchButton;
