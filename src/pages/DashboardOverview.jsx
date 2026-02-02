import React from "react";
import OverviewCardsGroup from "./dashboard/OverviewCards";
import PaymentsOverview from "./dashboard/PaymentsOverview";
import WeeksProfit from "./dashboard/WeeksProfit";

export default function DashboardOverview() {
  return (
    <>

      <OverviewCardsGroup />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview className="col-span-12 xl:col-span-6" />

        <WeeksProfit className="col-span-12 xl:col-span-6" />
      </div>
    </>
  );
}

