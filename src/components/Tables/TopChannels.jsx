import React from 'react';

const TopChannels = () => {
  // Mock data for the table
  const tableData = [
    { channel: 'Direct', visitors: '19,012', percentage: 45 },
    { channel: 'Social Media', visitors: '12,054', percentage: 30 },
    { channel: 'Google Search', visitors: '8,934', percentage: 20 },
    { channel: 'Email Marketing', visitors: '3,421', percentage: 5 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 col-span-12 w-full">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">Top Channels</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Channel</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Visitors</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800 dark:text-white">{row.channel}</td>
                <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300">{row.visitors}</td>
                <td className="px-3 sm:px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                  <div className="flex items-center">
                    <div className="w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-orange-500 h-1.5 sm:h-2 rounded-full"
                        style={{ width: `${row.percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{row.percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopChannels;