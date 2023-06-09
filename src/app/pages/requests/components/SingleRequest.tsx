import { Loader } from "@mantine/core";
import { Button } from "~/@main/components/Button";
import Info from "~/@main/components/Info";
import { CoachRequest } from "~/app/store/types/supervisor-types";
import { useState } from "react";
import {
  useSuperAcceptCoachRequestMutation,
  useSuperDeclineCoachRequestMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminAcceptCoachRequestMutation,
  useAdminDeclineCoachRequestMutation,
} from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";

const SingleRequest = ({
  first_name,
  last_name,
  mobile,
  country,
  city,
  id,
}: CoachRequest) => {
  const { data: user } = useUserQuery({});

  // const [isLoading, setIsLoading] = useState(false);
  const [superAcceptRequest, { isLoading: superAcceptLoading }] =
    useSuperAcceptCoachRequestMutation();

  const [superDeclineRequest, { isLoading: superDeclineLoading }] =
    useSuperDeclineCoachRequestMutation();

  const [adminAcceptRequest, { isLoading: adminAcceptLoading }] =
    useAdminAcceptCoachRequestMutation();

  const [adminDeclineRequest, { isLoading: adminDeclineLoading }] =
    useAdminDeclineCoachRequestMutation();

  return (
    <div className="h-full flex flex-col rounded-3xl bg-white px-3 py-6 gap-2 border border-perfBlue items-stretch">
      <h1>Request's Info.</h1>
      <div className="flex flex-col gap-2">
        <Info label="Name" value={first_name + " " + last_name} />
        <div className="flex flex-row gap-5 lg:gap-7 justify-between">
          <Info label="Phone" value={mobile} />
          <Info label="Address" value={country + ", " + city} />
        </div>
        <button
          type="submit"
          onClick={() => {
            if (user?.user_type === "Admin") {
              adminAcceptRequest({ coach_id: id }).then((res) => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Coach Request Accepted"
                );
              });
            } else {
              superAcceptRequest({ coach_id: id }).then((res) => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Coach Request Accepted"
                );
              });
            }
          }}
          disabled={superAcceptLoading || adminAcceptLoading} //isLoading
          className="mx-auto flex justify-center w-full disabled:bg-gray-500 bg-perfBlue rounded-lg items-center text-white h-12 mt-10 mb-2"
        >
          {!superAcceptLoading || !adminAcceptLoading ? (
            <span> Accept </span>
          ) : (
            <Loader variant="dots" color="white" />
          )}
        </button>

        <button
          type="submit"
          onClick={() => {
            if (user?.user_type === "Admin") {
              adminDeclineRequest({ coach_id: id }).then((res) => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Coach Request Decline"
                );
              });
            } else {
              superDeclineRequest({ coach_id: id }).then((res) => {
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Coach Request Decline"
                );
              });
            }
          }}
          disabled={adminDeclineLoading || superDeclineLoading} //isLoading
          className="mx-auto flex justify-center w-full disabled:bg-gray-500 rounded-md bg-perfGray4 text-perfGray2 hover:shadow-md hover:bg-scoreRed hover:text-white items-center  h-12 mb-2"
        >
          {!adminDeclineLoading || !superDeclineLoading ? (
            <span> Decline </span>
          ) : (
            <Loader variant="dots" color="white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SingleRequest;
