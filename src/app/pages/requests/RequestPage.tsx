import { LoadingOverlay } from "@mantine/core";
import React from "react";
import { useSuperCoachesRequestsQuery } from "~/app/store/supervisor/supervisorMainApi";
import SingleRequest from "./components/SingleRequest";

type Props = {};

const RequestPage = (props: Props) => {
  const { data: requests } = useSuperCoachesRequestsQuery({});
  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-center mt-10 lg:justify-start flex-wrap gap-4 m-4">
      {requests?.results && requests?.results.length < 1 ? (
        <div className="mt-10 auto w-full flex flex-col justify-center items-center">
          <img
            className="w-96 max-w-full"
            src="/assets/images/norequests.png"
          />
          <p className="text-2xl text-perfGray1">
            You accepted <span className="font-bold">all requests</span>
          </p>
        </div>
      ) : (
        <>
          {requests?.results.map((request) => {
            return <SingleRequest {...request} />;
          })}
        </>
      )}
    </div>
  );
};

export default RequestPage;
