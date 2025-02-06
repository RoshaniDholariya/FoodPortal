const RecentDonations = ({ donations }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Recent Donations</h3>
    </div>
    <div className="divide-y divide-gray-200">
      {donations.map((donation) => (
        <div
          key={donation.id}
          className="p-6 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {donation.name}
              </h4>
              <span
                className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                  donation.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {donation.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentDonations;
