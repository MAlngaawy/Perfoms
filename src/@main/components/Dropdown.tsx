import React, { useState } from 'react';
// import { MdKeyboardArrowUp , MdKeyboardArrowDown } from 'react-icons/md';
import { DropdownProps } from 'app/store/types/user-types'


export const Dropdown = ({label , listItems}:DropdownProps) => {
    const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      <button className={`${open? 'opened' : ''} dropdown-btn`} onClick={handleOpen}>Dropdown {/*open?<MdKeyboardArrowUp/>:<MdKeyboardArrowDown/>*/}</button>
      {open ? (
        <ul className="menu">
          {listItems.map((item,index)=>{
            return <li className="menu-item">
                      <button>{item}</button>
                    </li>
          })}
        </ul>
      ) : null}
      
    </div>
  );
};


