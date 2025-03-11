import React from "react";
import {
  ShoppingBag,
  Flag,
  AlertTriangle,
  Star,
  BarChart,
  Ban,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
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
} from "recharts";

const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const DonorDetails = ({ donor }) => {
  const COLORS = ["#0088FE", "#FF8042", "#FFBB28"];

  const deactivateDonor = () => {
    alert(`Donor ${donor.name} has been deactivated`);
  };

  return (
    <div className="space-y-8">
      <FadeIn delay={100}>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{donor.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Donor ID: {donor.id}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={deactivateDonor}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Ban className="h-4 w-4 mr-2" />
                Deactivate Donor
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-teal-500" />
                <h4 className="ml-2 text-sm font-medium text-gray-700">
                  Total Donations
                </h4>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {donor.totalDonations}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Flag className="h-5 w-5 text-red-500" />
                <h4 className="ml-2 text-sm font-medium text-gray-700">
                  Quality Reports
                </h4>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {donor.totalReports}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h4 className="ml-2 text-sm font-medium text-gray-700">
                  Report Ratio
                </h4>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {donor.reportRatio.toFixed(1)}%
              </p>
              <p
                className={`text-xs ${
                  donor.reportRatio > 10
                    ? "text-red-600"
                    : donor.reportRatio > 5
                    ? "text-orange-600"
                    : "text-green-600"
                } mt-1`}
              >
                {donor.reportRatio > 10
                  ? "High risk"
                  : donor.reportRatio > 5
                  ? "Moderate risk"
                  : "Low risk"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Quality Ratings Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={donor.qualityRatings}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="rating"
                      label={{
                        position: "bottom",
                      }}
                    />
                    <YAxis
                      label={{
                        value: "No. of Ratings",
                        angle: -90,
                        position: "insideLeft",
                        offset: 10,
                        dy: 10,
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#FBBF24" name="Ratings Count" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                Donation Status Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        {
                          name: "Completed",
                          value: donor.donationStatus.completed,
                        },
                        {
                          name: "Expired",
                          value: donor.donationStatus.expired,
                        },
                        {
                          name: "Pending",
                          value: donor.donationStatus.pending,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {[
                        {
                          name: "Completed",
                          value: donor.donationStatus.completed,
                        },
                        {
                          name: "Expired",
                          value: donor.donationStatus.expired,
                        },
                        {
                          name: "Pending",
                          value: donor.donationStatus.pending,
                        },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Reported Issues History
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reported By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Issue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donor.reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.ngoName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.issue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.severity === "critical"
                            ? "bg-red-100 text-red-800"
                            : report.severity === "high"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {report.severity.charAt(0).toUpperCase() +
                          report.severity.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default DonorDetails;
