import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Users, Building, ChevronRight } from "lucide-react";

// Food Donation Trends Chart
export const DonationTrendsChart = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorDonated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorWasted" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="donated"
          name="Donated Food (items)"
          stroke="#4ade80"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorDonated)"
        />
        <Area
          type="monotone"
          dataKey="wasted"
          name="Wasted Food (items)"
          stroke="#f87171"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorWasted)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// Food Distribution Pie Chart
export const DistributionPieChart = ({ data, cumulativeData }) => (
  <>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value} items`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="bg-green-50 p-3 rounded-lg text-center">
        <div className="text-green-600 text-xs font-medium mb-1">DONATED</div>
        <div className="text-green-700 text-xl font-bold">
          {cumulativeData.donated.toLocaleString()}
        </div>
      </div>
      <div className="bg-red-50 p-3 rounded-lg text-center">
        <div className="text-red-600 text-xs font-medium mb-1">WASTED</div>
        <div className="text-red-700 text-xl font-bold">
          {cumulativeData.wasted.toLocaleString()}
        </div>
      </div>
    </div>
  </>
);

// Donors vs NGOs Chart
export const DonorsNgosChart = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Bar
          dataKey="donors"
          fill="#6366f1"
          name="Number of Donors"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="ngos"
          fill="#0ea5e9"
          name="Number of NGOs"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Donor Insights Card
export const DonorInsightsCard = ({ analytics, stats }) => (
  <div className="space-y-4">
    <div className="p-4 rounded-lg bg-indigo-50">
      <div className="flex items-center">
        <Users className="h-5 w-5 text-indigo-600 mr-2" />
        <h4 className="font-medium text-indigo-800">Total Registered Donors</h4>
      </div>
      <p className="text-3xl font-bold text-indigo-600 mt-2">
        {analytics?.totalDonors?.toLocaleString() || 0}
      </p>
      <div className="flex items-center mt-2 text-sm text-indigo-700">
        <ChevronRight className="h-4 w-4 mr-1" />
        <span>
          Average donation per donor:{" "}
          {analytics?.totalDonors
            ? (
                (analytics.donationStats?.completed || 0) /
                analytics.totalDonors
              ).toFixed(1)
            : 0}{" "}
          items
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700">Active Donor Rate</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {analytics?.totalDonors
            ? (
                ((analytics.totalDonors * 0.8) / analytics.totalDonors) *
                100
              ).toFixed(1)
            : 0}
          %
        </p>
      </div>
      <div className="p-4 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700">Donor Growth</h4>
        <p className="text-2xl font-bold text-green-600 mt-1">
          +{stats[0].trend.toFixed(1)}%
        </p>
      </div>
    </div>
  </div>
);

// NGO Insights Card
export const NgoInsightsCard = ({ analytics, stats }) => (
  <div className="space-y-4">
    <div className="p-4 rounded-lg bg-blue-50">
      <div className="flex items-center">
        <Building className="h-5 w-5 text-blue-600 mr-2" />
        <h4 className="font-medium text-blue-800">Total Active NGOs</h4>
      </div>
      <p className="text-3xl font-bold text-blue-600 mt-2">
        {analytics?.totalNgos?.toLocaleString() || 0}
      </p>
      <div className="flex items-center mt-2 text-sm text-blue-700">
        <ChevronRight className="h-4 w-4 mr-1" />
        <span>
          Average receipt per NGO:{" "}
          {analytics?.totalNgos
            ? (
                (analytics.donationStats?.completed || 0) / analytics.totalNgos
              ).toFixed(1)
            : 0}{" "}
          items
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700">NGO Participation</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {analytics?.totalNgos
            ? (
                ((analytics.totalNgos * 0.75) / analytics.totalNgos) *
                100
              ).toFixed(1)
            : 0}
          %
        </p>
      </div>
      <div className="p-4 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700">NGO Growth</h4>
        <p className="text-2xl font-bold text-green-600 mt-1">
          +{stats[1].trend.toFixed(1)}%
        </p>
      </div>
    </div>
  </div>
);

// Food Status Chart
export const FoodStatusChart = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Bar
          dataKey="donated"
          fill="#4ade80"
          name="Donated Food Items"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="wasted"
          fill="#f87171"
          name="Wasted Food Items"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const CurrentStatusCard = ({ cumulativeData }) => (
  <div className="space-y-4">
    <div className="p-4 rounded-lg bg-gray-50">
      <h4 className="font-medium text-gray-800">Current Food Distribution</h4>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-sm text-gray-500">Donated</p>
          <p className="text-xl font-bold text-green-600">
            {cumulativeData.donated.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Wasted</p>
          <p className="text-xl font-bold text-red-600">
            {cumulativeData.wasted.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-gray-900">
            {(cumulativeData.donated + cumulativeData.wasted).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Wastage Reduction Chart
export const WastageReductionChart = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value) => [`${value}%`, "Wastage Reduction"]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="wastageReduction"
          name="Wastage Reduction (%)"
          stroke="#f97316"
          strokeWidth={2}
          dot={{ fill: "#f97316", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DashboardCharts = ({
  foodStatusData,
  donorNgoData,
  wastageReductionData,
  cumulativeData,
  pieChartData,
}) => {
  return {
    donorsNgosChart: <DonorsNgosChart data={donorNgoData} />,
    foodStatusChart: <FoodStatusChart data={foodStatusData} />,
    wastageReductionChart: (
      <WastageReductionChart data={wastageReductionData} />
    ),
    donationTrendsChart: <DonationTrendsChart data={foodStatusData} />,
    distributionPieChart: (
      <DistributionPieChart
        data={pieChartData}
        cumulativeData={cumulativeData}
      />
    ),
  };
};

export default DashboardCharts;
