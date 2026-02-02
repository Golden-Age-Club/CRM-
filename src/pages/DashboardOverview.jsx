import React from "react";
import OverviewCardsGroup from "../components/OverviewCards";
import PaymentsOverview from "../components/Charts/PaymentsOverview";
import WeeksProfit from "../components/Charts/WeeksProfit";

export default function DashboardOverview() {
  return (
    <>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Golden Cash Casino Admin Dashboard
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Monitor players, bets, games, risk, bonus, and finance in one place.
        </p>
      </div>

      <OverviewCardsGroup />

      <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-2 2xl:gap-7.5">
        <PaymentsOverview className="w-full" />

        <WeeksProfit className="w-full" />
      </div>
    </>
  );
}

