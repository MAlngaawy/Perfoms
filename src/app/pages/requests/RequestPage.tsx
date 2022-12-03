import React from "react";
import { useManageCoachesRequestsQuery } from "~/app/store/clubManager/clubManagerApi";
import SingleRequest from "./components/SingleRequest";

type Props = {};

const RequestPage = (props: Props) => {
  const { data: requests } = useManageCoachesRequestsQuery({});
  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-center mt-10 lg:justify-start flex-wrap gap-4 m-4">
      {requests?.results.map((request) => {
        return <SingleRequest {...request} />;
      })}
    </div>
  );
};

export default RequestPage;
