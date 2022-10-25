import navigationConfig from "app/configs/navigationConfig";
import React, { memo } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div>
      {navigationConfig.map((i) => (
        <Link to={i.url} key={i.id}>
          {i.title}
        </Link>
      ))}
    </div>
  );
};

export default memo(Navigation);
