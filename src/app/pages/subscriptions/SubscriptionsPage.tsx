import { useEffect, useState } from "react";
import { useParentSubscriptionsQuery } from "~/app/store/parent/parentApi";
import SubscriptionCard from "./molecules/SubscriptionCard";

const dummyData = [
  {
    id: 0,
    price: 100,
    title: "Starter",
    description: "Unleash the power of Sport.",
    offer: ["1 player", "2 Teams", "Chat system and monthly reports"],
    currentPlan: true,
  },
  {
    id: 1,
    price: 300,
    title: "Professional",
    description: "Advanced tools to take your Players to the next level.",
    offer: ["3 player", "10 Teams", "Chat system, weekly, and monthly reports"],
  },
  {
    id: 2,
    price: 1000,
    title: "SUP PRO!",
    description: "Unleash the power of Sport.",
    offer: [
      "10 player",
      "30 Teams",
      "Chat systems, weekly, monthly and yearly reports",
    ],
    isMostPopular: true,
  },
];

const SubscriptionsPage = () => {
  const [currentPlan, setCurrentPlan] = useState("");
  const { data: subscriptions } = useParentSubscriptionsQuery({});
  useEffect(() => {
    dummyData.map((plan) => {
      plan.currentPlan ? setCurrentPlan(plan.title) : null;
    });
  }, []);

  return (
    <div className="subscriptions-page px-1 py-5 md:w-3/4 mx-auto md:my-20">
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
      <div className="subscription-board flex flex-col md:flex-row bg-white p-3 md:p-10 rounded-3xl gap-10">
        {subscriptions &&
          subscriptions.results.map((plan: any) => {
            return <SubscriptionCard plan={plan} />;
          })}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
