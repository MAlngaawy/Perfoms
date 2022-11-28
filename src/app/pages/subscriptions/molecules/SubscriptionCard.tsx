import AppIcons from "~/@main/core/AppIcons";
import React, { useEffect } from "react";
import {
  SelectSubscription,
  SelectSubscriptionRes,
  Subscription,
} from "~/app/store/types/parent-types";
import { useSelectSubscriptionMutation } from "~/app/store/parent/parentApi";
import {
  BaseQueryFn,
  FetchArgs,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { SerializedError } from "~/app/store";

interface SubscripionCardProps {
  plan: Subscription;
  selectPlan: MutationTrigger<
    MutationDefinition<
      SelectSubscription,
      BaseQueryFn<string | FetchArgs, unknown, SerializedError, {}, {}>,
      "Parent" | "Player" | "Subscriptions",
      SelectSubscriptionRes,
      "parentsApi"
    >
  >;
}

const SubscriptionCard = ({ plan, selectPlan }: SubscripionCardProps) => {
  return (
    <div
      className={`${
        true
          ? "most-popular-card bg-perfBlue text-white p-3 px-5 rounded-3xl"
          : "gap-5 p-3 px-5 md:px-0 md:p-0"
      } flex flex-col justify-between relative`}
    >
      <div className="flex flex-col gap-1">
        {true ? (
          <p className="self-end m-3 text-xs px-2 py-1 rounded-full bg-perfBlue2">
            MOST POPULAR
          </p>
        ) : null}
        <h2 className="text-4xl font-bold">
          LE{plan.price}{" "}
          <span className="text-sm font-normal opacity-90">/year</span>
        </h2>
        <h3 className="text-2xl font-medium">{plan.title}</h3>
        <p className="text-sm opacity-75 font-medium">{plan.description}</p>
        <ul>
          {plan.options.map((offer, index) => {
            return (
              <li className={`${true ? "mb-3" : "mb-1"}`} key={index}>
                <AppIcons
                  className="w-6 inline mr-2 bg-perfLigtGray p-1 rounded-full text-perfBlue"
                  icon="CheckIcon:outline"
                />
                <span className="text-sm opacity-75 font-medium">
                  {offer.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className={`${
          true ? "bg-green" : "bg-perfBlue text-white"
        } h-12 w-48 mx-auto rounded-full disabled:bg-perfGray3`}
        onClick={() =>
          selectPlan({ subscription: plan.id, subscription_type: "Monthly" })
        }
        disabled={plan.current_plan}
      >
        {plan.current_plan ? "Current plan" : "Choose plan"}
      </button>
    </div>
  );
};

export default SubscriptionCard;
