import React from "react";
import OverviewCardsGroup from "./dashboard/OverviewCards";
import PaymentsOverview from "./dashboard/PaymentsOverview";
import WeeksProfit from "./dashboard/WeeksProfit";

export default function DashboardOverview() {
  return (
    <>

      <OverviewCardsGroup />

      <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-2 2xl:gap-7.5">
        <PaymentsOverview className="w-full" />

        <WeeksProfit className="w-full" />
      </div>
    </>
  );
}

