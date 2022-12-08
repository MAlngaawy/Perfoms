import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Info from "~/@main/components/Info";
import { PlayerParent } from "~/app/store/types/coach-types";
import { Avatar } from "@mantine/core";
import classNames from "classnames";
import {
  useGetParentInfoQuery,
  useGetPlayerInfoQuery,
} from "~/app/store/coach/coachApi";
import { useUserQuery } from "~/app/store/user/userApi";

const ParentInfoCard = ({
  id,
  first_name,
  last_name,
  avatar,
  phone,
  supscription,
  job,
  parentName,
  playerName,
}: any) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery(null);

  return (
    <div className="p-4  h-full border border-perfGray4 bg-white rounded-3xl flex flex-col gap-1">
      <h2>Parent's info</h2>

      <div className="flex flex-col xs:flex-row gap-6 h-full">
        <div className="img my-2">
          <Avatar
            src={avatar}
            className="w-40 h-full rounded-lg object-cover "
            alt="parent"
          />
        </div>
        <div className="infos1 flex gap-6">
          <Info label="Name" value={first_name + last_name} />
          <Info label="Phone" value={phone} />
        </div>
        <div className="infos2 flex flex-col gap-6">
          <Info label="Subscription" value={supscription} />
          <Info label="Job" value={job} />
          {user?.user_type === "Coach" && (
            <button
              className={classNames(
                " text-xs sm:text-sm p-1 md:px-2 border border-perfBlue rounded-md text-perfBlue hover:text-white hover:bg-perfBlue "
              )}
              onClick={() => navigate(`parent/${id}/notify`)}
            >
              Notify Parent
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentInfoCard;
