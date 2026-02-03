import React, { useState } from "react";
import { toast } from 'react-toastify';
import ActionsMenu from "../components/ActionsMenu";

export default function RiskPage() {
  const [activeTab, setActiveTab] = useState("abnormal");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionReason, setActionReason] = useState("");

  // Mock data
  const abnormalUsers = [
    { 
      id: 1, 
      username: "player002", 
      riskLevel: "High", 
      riskReasons: ["Multiple failed logins", "Unusual betting patterns"], 
      lastActivity: "2024-01-18 10:30",
      status: "active",
      totalBets: 15000,
      winRate: 85.2
    },
    { 
      id: 2, 
      username: "player006", 
      riskLevel: "High", 
      riskReasons: ["Suspicious deposit patterns", "Account sharing indicators"], 
      lastActivity: "2024-01-17 14:20",
      status: "restricted",
      totalBets: 8500,
      winRate: 92.1
    },
    { 
      id: 3, 
      username: "player009", 
      riskLevel: "Medium", 
      riskReasons: ["Rapid balance changes"], 
      lastActivity: "2024-01-18 09:15",
      status: "active",
      totalBets: 3200,
      winRate: 78.5
    },
  ];

  const riskRules = [
    {
      id: 1,
      name: "Multiple Failed Logins",
      description: "More than 5 failed login attempts in 1 hour",
      severity: "High",
      triggered: 12,
      lastTriggered: "2024-01-18 11:30"
    },
    {
      id: 2,
      name: "Unusual Win Rate",
      description: "Win rate above 90% with more than 100 bets",
      severity: "High",
      triggered: 3,
      lastTriggered: "2024-01-17 16:45"
    },
    {
      id: 3,
      name: "Rapid Deposit Pattern",
      description: "More than 10 deposits in 24 hours",
      severity: "Medium",
      triggered: 8,
      lastTriggered: "2024-01-18 08:20"
    },
    {
      id: 4,
      name: "Large Bet Variance",
      description: "Bet amount variance exceeds 1000% of average",
      severity: "Medium",
      triggered: 15,
      lastTriggered: "2024-01-18 12:15"
    },
  ];

  const riskHistory = [
    {
      id: 1,
      userId: 1,
      username: "player002",
      rule: "Multiple Failed Logins",
      severity: "High",
      timestamp: "2024-01-18 10:30",
      details: "6 failed attempts from IP 192.168.1.100",
      status: "active"
    },
    {
      id: 2,
      userId: 2,
      username: "player006",
      rule: "Unusual Win Rate",
      severity: "High",
      timestamp: "2024-01-17 14:20",
      details: "Win rate: 92.1% over 150 bets",
      status: "resolved"
    },
    {
      id: 3,
      userId: 3,
      username: "player009",
      rule: "Rapid Deposit Pattern",
      severity: "Medium",
      timestamp: "2024-01-18 09:15",
      details: "12 deposits totaling $5,000 in 18 hours",
      status: "investigating"
    },
  ];

  const handleUserAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowActionModal(true);
  };

  const handleSaveAction = () => {
    // TODO: API call
    toast.success(`Action "${actionType}" applied to ${selectedUser.username}. Reason: ${actionReason}`);
    setShowActionModal(false);
    setSelectedUser(null);
    setActionType("");
    setActionReason("");
  };

  const getRiskBadge = (risk) => {
    const colors = {
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[risk]}`}>{risk}</span>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      restricted: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      frozen: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      investigating: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      resolved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[severity]}`}>{severity}</span>;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Risk Control</h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          Monitor abnormal users, view triggered risk rules, and apply restrictions.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto -mb-px">
            {[
              { id: "abnormal", label: "Abnormal Users" },
              { id: "rules", label: "Risk Rules" },
              { id: "history", label: "Risk History" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={
                activeTab === "abnormal" ? "Search by username..." :
                activeTab === "rules" ? "Search by rule name..." :
                "Search by username or rule..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Abnormal Users Tab */}
          {activeTab === "abnormal" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Risk</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Reasons</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Win Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {abnormalUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{user.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getRiskBadge(user.riskLevel)}</td>
                      <td className="hidden sm:table-cell px-4 py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-[150px]">
                        <div className="space-y-1">
                          {user.riskReasons.map((reason, idx) => (
                            <div key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded truncate">
                              {reason}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{user.winRate}%</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm relative">
                        <ActionsMenu
                          isOpen={openMenu === `risk-${user.id}`}
                          onToggle={() => setOpenMenu(openMenu === `risk-${user.id}` ? null : `risk-${user.id}`)}
                          showIcons={false}
                          actions={[
                            {
                              label: "Freeze Account",
                              onClick: () => handleUserAction(user, "freeze"),
                              danger: true
                            },
                            {
                              label: "Restrict Account",
                              onClick: () => handleUserAction(user, "restrict"),
                              danger: true
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Risk Rules Tab */}
          {activeTab === "rules" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Rule</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Severity</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Triggered</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Last Triggered</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {riskRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{rule.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{rule.name}</td>
                      <td className="hidden lg:table-cell px-4 py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-[200px] truncate">{rule.description}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getSeverityBadge(rule.severity)}</td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{rule.triggered}</td>
                      <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">{rule.lastTriggered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Risk History Tab */}
          {activeTab === "history" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Rule</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Severity</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Details</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {riskHistory.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{record.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{record.username}</td>
                      <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white truncate max-w-[120px]">{record.rule}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getSeverityBadge(record.severity)}</td>
                      <td className="hidden lg:table-cell px-4 py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-[150px] truncate">{record.details}</td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">{record.timestamp}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
              {actionType === "freeze" ? "Freeze Account" : "Restrict Account"}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">User: <strong>{selectedUser.username}</strong></p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level: {getRiskBadge(selectedUser.riskLevel)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason (Required)</label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Enter reason for this action..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  This action will be logged and the user will be notified.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedUser(null);
                  setActionType("");
                  setActionReason("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAction}
                disabled={!actionReason.trim()}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {actionType === "freeze" ? "Freeze Account" : "Restrict Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
