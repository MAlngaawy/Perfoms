import { useEffect, useState } from "react";
import {
  useParentSubscriptionsQuery,
  useSelectSubscriptionMutation,
} from "~/app/store/parent/parentApi";
import SubscriptionCard from "./molecules/SubscriptionCard";
import { Skeleton } from "@mantine/core";

const SubscriptionsPage = () => {
  const [currentPlan, setCurrentPlan] = useState("");
  const { data: subscriptions } = useParentSubscriptionsQuery({});

  const [selectPlan, { data, isError, isLoading, isSuccess }] =
    useSelectSubscriptionMutation();

  useEffect(() => {
    if (data && isSuccess) window.location.replace(data.data);
  }, [data, isSuccess]);

  return (
    <div className="subscriptions-page px-1 py-5 m-6 sm:mx-20">
      <div>
        <h1 className="text-3xl md:text-4xl pb-5">Plans & Pricing</h1>
        <p className="opacity-75 font-medium pb-5">
          We created plans to suit everyone. select what works best for you.
        </p>
        <p className="text-sm opacity-90 pb-5">
          Your current plan is{" "}
          <span className="font-medium text-perfBlue">{currentPlan}</span>
        </p>
      </div>
      <div className="bg-white/50 rounded-3xl ">
        <div className="subscription-board  flex flex-col md:flex-row p-10 gap-6 justify-between">
          {subscriptions
            ? subscriptions.results.map((plan: any) => (
                <SubscriptionCard plan={plan} selectPlan={selectPlan} />
              ))
            : [1, 2, 3].map((plan: any) => (
                <Skeleton height={600} width="100%" radius="lg" />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
