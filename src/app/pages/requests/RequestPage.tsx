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
        <div className="mt-10 text-perfGray3 mx-auto rounded-3xl p-10 sm:p-20 flex justify-center items-center text-3xl font-bold bg-slate-300 h-80">
          No Requests Yet
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
