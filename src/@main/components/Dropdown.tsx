import React, { useState } from "react";
import { DropdownProps } from "app/store/types/user-types";
import AppIcons from "~/@main/core/AppIcons";

export const Dropdown = ({
  label,
  listItems,
  icon,
  styleType,
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const primary = "bg-perfBlue text-white shadow-md";
  const basic = "bg-white text-black shadow-md";
  const borded =
    "text-perfBlue shadow-md border-perfBlue border-2 border-perfBlue";

  return (
    <div className="dropdown">
      <button
        className={`${open ? "opened" : ""} ${
          styleType === "primary"
            ? primary
            : styleType === "borded"
            ? borded
            : styleType === "basic"
            ? basic
            : ""
        } h-50 dropdown-btn flex flex-row justify-center items-center p-3`}
        onClick={handleOpen}
      >
        {icon ? <AppIcons className="w-5" icon={icon} /> + " " : ""}
        {label}{" "}
        {open ? (
          <AppIcons className="w-5 mt-1 ml-3" icon="ChevronUpIcon:outline" />
        ) : (
          <AppIcons className="w-5 mt-1 ml-3" icon="ChevronDownIcon:outline" />
        )}
      </button>
      {open ? (
        <ul className="menu">
          {listItems.map((item, index) => {
            return (
              <li className="menu-item">
                <button>{item}</button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
