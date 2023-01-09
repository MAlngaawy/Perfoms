import { LoadingOverlay } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useManageCoachesRequestsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperCoachesRequestsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { CoachesRequests } from "~/app/store/types/clubManager-types";
import { CoachRequests } from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";
import SingleRequest from "./components/SingleRequest";

type Props = {};

const RequestPage = (props: Props) => {
  const [requests, setRequests] = useState<CoachRequests>();
  const { data: user } = useUserQuery({});
  const { data: superRequests } = useSuperCoachesRequestsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );
  const { data: adminRequests } = useManageCoachesRequestsQuery(
    {},
    { skip: user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (superRequests) setRequests(superRequests);
    if (adminRequests) setRequests(adminRequests);
  }, [superRequests, adminRequests]);

  if (!requests?.results) {
    return (
      <div className="mt-10 auto w-full flex flex-col justify-center items-center">
        <img className="w-96 max-w-full" src="/assets/images/norequests.png" />
        <p className="text-2xl text-perfGray1">
          You accepted <span className="font-bold">all requests</span>
        </p>
      </div>
    );
  }

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
            return <SingleRequest key={request.id} {...request} />;
          })}
        </>
      )}
    </div>
  );
};

export default RequestPage;
