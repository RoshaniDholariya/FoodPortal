const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-center">
          <stat.icon className="h-8 w-8 text-[#61cf73]" />
          <div className="ml-5">
            <div className="text-sm font-medium text-gray-500">
              {stat.label}
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {stat.value}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StatsGrid;
