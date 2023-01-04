import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {};

const ResetPassword = (props: Props) => {
  const [param] = useSearchParams();
  console.log(param.get("usermobile"));

  return <div>ResetPassword</div>;
};

export default ResetPassword;
