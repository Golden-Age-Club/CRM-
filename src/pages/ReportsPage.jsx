import React, { useState } from "react";
import { toast } from 'react-toastify';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateRange, setDateRange] = useState("7d");
  const [exportFormat, setExportFormat] = useState("csv");

  // Mock data for core metrics
  const coreMetrics = {
    ggr: { value: 125000, change: 12.5, period: "Last 7 days" },
    rtp: { value: 96.2, change: -0.3, period: "Last 7 days" },
    dau: { value: 1250, change: 8.2, period: "Last 7 days" },
    revenue: { value: 89500, change: 15.3, period: "Last 7 days" },
    newUsers: { value: 145, change: 22.1, period: "Last 7 days" },
    deposits: { value: 67800, change: 9.8, period: "Last 7 days" },
    withdrawals: { value: 45200, change: -5.2, period: "Last 7 days" },
    activeGames: { value: 24, change: 0, period: "Last 7 days" }
  };

  const gamePerformance = [
    { name: "Lucky Slots", ggr: 25000, rtp: 95.8, players: 450, sessions: 1250 },
    { name: "Mega Fortune", ggr: 18500, rtp: 97.2, players: 320, sessions: 890 },
    { name: "Diamond Rush", ggr: 15200, rtp: 96.5, players: 280, sessions: 720 },
    { name: "Golden Wheel", ggr: 12800, rtp: 94.9, players: 210, sessions: 580 },
    { name: "Fire Jackpot", ggr: 11200, rtp: 96.8, players: 190, sessions: 450 },
  ];

  const playerSegments = [
    { segment: "High Rollers", count: 45, ggr: 45000, avgBet: 250, retention: 85 },
    { segment: "VIP Players", count: 120, ggr: 35000, avgBet: 150, retention: 78 },
    { segment: "Regular Players", count: 680, ggr: 32000, avgBet: 25, retention: 65 },
    { segment: "New Players", count: 405, ggr: 13000, avgBet: 15, retention: 45 },
  ];

  const handleExport = (dataType) => {
    // TODO: API call for data export
    toast.success(`Exporting ${dataType} data as ${exportFormat.toUpperCase()}`);
  };

  const getChangeColor = (change) => {
    if (change > 0) return "text-green-600 dark:text-green-400";
    if (change < 0) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getChangeIcon = (change) => {
    if (change > 0) return "↗";
    if (change < 0) return "↘";
    return "→";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reports & Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Core metrics dashboard with GGR, RTP, DAU analytics and data export capabilities.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Export Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleExport("dashboard")}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { id: "dashboard", label: "Core Metrics" },
              { id: "games", label: "Game Performance" },
              { id: "players", label: "Player Segments" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600 dark:text-orange-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Core Metrics Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(coreMetrics).map(([key, metric]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                          {key === "ggr" ? "GGR" : 
                           key === "rtp" ? "RTP" : 
                           key === "dau" ? "DAU" :
                           key === "newUsers" ? "New Users" :
                           key === "activeGames" ? "Active Games" :
                           key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {key === "rtp" ? `${metric.value}%` :
                           key === "dau" || key === "newUsers" || key === "activeGames" ? metric.value.toLocaleString() :
                           `$${metric.value.toLocaleString()}`}
                        </p>
                      </div>
                      <div className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                        <span className="text-lg">{getChangeIcon(metric.change)}</span>
                        <span className="ml-1">{Math.abs(metric.change)}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{metric.period}</p>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">GGR Trend</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <p>GGR trend chart would be displayed here</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Player Activity</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <p>Player activity chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Game Performance Tab */}
          {activeTab === "games" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Game Performance Analysis</h3>
                <button
                  onClick={() => handleExport("games")}
                  className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                >
                  Export Games Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Game Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">GGR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">RTP</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Active Players</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Sessions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Avg Session</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {gamePerformance.map((game, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{game.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${game.ggr.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{game.rtp}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{game.players}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{game.sessions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {Math.round(game.ggr / game.sessions)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Player Segments Tab */}
          {activeTab === "players" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Player Segment Analysis</h3>
                <button
                  onClick={() => handleExport("players")}
                  className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                >
                  Export Player Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Segment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Player Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">GGR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Avg Bet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Retention Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">GGR per Player</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {playerSegments.map((segment, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{segment.segment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{segment.count}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${segment.ggr.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${segment.avgBet}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{segment.retention}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${Math.round(segment.ggr / segment.count).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}