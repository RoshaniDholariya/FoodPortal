
import React from "react";
import StatsGrid from "./Statstic";
import {
  DonationTrendsChart,
  DistributionPieChart,
  DonorsNgosChart,
  DonorInsightsCard,
  NgoInsightsCard,
  FoodStatusChart,
  CurrentStatusCard,
  WastageReductionChart,
} from "./Chart";

const TabsContent = ({
  activeTab,
  stats,
  foodStatusData,
  donorNgoData,
  wastageReductionData,
  cumulativeData,
  pieChartData,
  totalWastageReduction,
  wastageRatio,
  analytics,
  FadeIn,
}) => {
  switch (activeTab) {
    case "overview":
      return (
        <>
          <FadeIn>
            <StatsGrid stats={stats} FadeIn={FadeIn} />
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Food Donation Trends
                </h2>
                <DonationTrendsChart data={foodStatusData} />
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Food Distribution
                </h2>
                <DistributionPieChart
                  data={pieChartData}
                  cumulativeData={cumulativeData}
                />
              </div>
            </FadeIn>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FadeIn delay={300}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Donor Insights
                </h2>
                <DonorInsightsCard analytics={analytics} stats={stats} />
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  NGO Insights
                </h2>
                <NgoInsightsCard analytics={analytics} stats={stats} />
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Food Waste Analytics
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-orange-50">
                    <h4 className="font-medium text-orange-800">
                      Total Wastage Reduction
                    </h4>
                    <p className="text-3xl font-bold text-orange-600 mt-2">
                      {totalWastageReduction.toFixed(1)}%
                    </p>
                    <p className="text-sm text-orange-700 mt-1">
                      Over the last {foodStatusData.length} months
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-800">
                      Current Wastage Ratio
                    </h4>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{ width: `${wastageRatio}%` }}
                      ></div>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                      {wastageRatio.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </>
      );

    case "donors-ngos":
      return (
        <>
          <FadeIn>
            <StatsGrid stats={stats.slice(0, 2)} FadeIn={FadeIn} />
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 gap-6">
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Donors vs NGOs Comparison
                </h2>
                <DonorsNgosChart data={donorNgoData} />
              </div>
            </FadeIn>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={200}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Donor Insights
                </h2>
                <DonorInsightsCard analytics={analytics} stats={stats} />
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  NGO Insights
                </h2>
                <NgoInsightsCard analytics={analytics} stats={stats} />
              </div>
            </FadeIn>
          </div>
        </>
      );

    case "food-status":
      return (
        <>
          <FadeIn>
            <StatsGrid stats={stats.slice(2, 4)} FadeIn={FadeIn} />
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Food Status Overview
                </h2>
                <FoodStatusChart data={foodStatusData} />
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Distribution Summary
                </h2>
                <DistributionPieChart
                  data={pieChartData}
                  cumulativeData={cumulativeData}
                />
              </div>
            </FadeIn>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={300}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Wastage Reduction Progress
                </h2>
                <WastageReductionChart data={wastageReductionData} />
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Current Status
                </h2>
                <CurrentStatusCard cumulativeData={cumulativeData} />

                <div className="mt-4 p-4 rounded-lg bg-orange-50">
                  <h4 className="font-medium text-orange-800">
                    Wastage Reduction
                  </h4>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    {totalWastageReduction.toFixed(1)}%
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    From {wastageReductionData.length} months of data
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </>
      );

    default:
      return null;
  }
};

export default TabsContent;
