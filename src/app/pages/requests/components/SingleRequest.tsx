import { Loader } from "@mantine/core";
import { Button } from "~/@main/components/Button";
import Info from "~/@main/components/Info";
import { useAcceptCoachRequestQuery } from "~/app/store/clubManager/clubManagerApi";
import { CoachRequest } from "~/app/store/types/supervisor-types";
import { useState } from "react";
import { useAcceptCoachRequestMutation } from "~/app/store/supervisor/supervisorMainApi";

const SingleRequest = ({
  first_name,
  last_name,
  mobile,
  country,
  city,
  id,
}: CoachRequest) => {
  const [isLoading, setIsLoading] = useState(false);

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
          onClick={() => useAcceptCoachRequestMutation()}
          disabled={isLoading} //isLoading
          className="mx-auto flex justify-center w-full disabled:bg-gray-500 bg-perfBlue rounded-lg items-center text-white h-12 mt-10 mb-2"
        >
          {!isLoading ? (
            <span> Accept </span>
          ) : (
            <Loader variant="dots" color="white" />
          )}
        </button>
        <Button
          label="Decline"
          style="basic"
          className="h-10 rounded-md bg-perfGray4 text-perfGray2 hover:shadow-md"
          onClick={() => console.log("decline")}
        />
      </div>
    </div>
  );
};

export default SingleRequest;
