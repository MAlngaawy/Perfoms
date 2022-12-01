import SaleStaticChart from "./SalesStaticChart";

type Props = {};

const PerformanceSummaryCard = (props: Props) => {
  return (
    <div className="bg-white rounded-3xl p-6 h-full">
      <div className="title">
        <h1 className="text-sm font-normal">Performance Report summary</h1>
      </div>
      <SaleStaticChart />
    </div>
  );
};
export default PerformanceSummaryCard;
