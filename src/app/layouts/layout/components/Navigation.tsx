import AppIcons from "@main/core/AppIcons";
import navigationConfig from "app/configs/navigationConfig";
import React, { memo } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div>
      {navigationConfig.map((i) => (
        <Link
          to={i.url}
          key={i.id}
          className="flex content-center items-center gap-2"
        >
          <AppIcons icon={i.icon} />
          <p>{i.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default memo(Navigation);
