import { LoadingOverlay } from "@mantine/core";

import { useAuthCallbackMutation } from "~/app/store/health/healthApi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Oauth2callbackPage = () => {


  const navigate = useNavigate();
  const [AuthCallback, { data, isSuccess, isLoading, isError, error }] = useAuthCallbackMutation()
  const [bool, setbool] = useState(true)
  useEffect(() => {
    if (isSuccess){

       navigate('/health')}
    if (isLoading) setbool(true)
    else if (!isLoading) setbool(false)

  }, [isSuccess])
  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    const delay = 200;

    const timerId = setTimeout(() => {
      if (searchParams.get('code')) {
        AuthCallback({ code: searchParams.get('code') });
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [])

  return (
    <div className="health-signIn-page relative min-h-screen min-w-full px-5 mb-20">
      <LoadingOverlay visible={bool} overlayBlur={2} />
    </div>
  );

};

export default Oauth2callbackPage;
