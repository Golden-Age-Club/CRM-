import React, { useState } from "react";
import { toast } from 'react-toastify';
import ActionsMenu from "../components/ActionsMenu";

export default function VipPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newVipLevel, setNewVipLevel] = useState("");

  // Mock data
  const vipUsers = [
    { id: 1, username: "player001", currentVip: "Gold", totalDeposit: 15000, totalBets: 45000, lastActivity: "2024-01-18", status: "active" },
    { id: 2, username: "player003", currentVip: "Platinum", totalDeposit: 50000, totalBets: 120000, lastActivity: "2024-01-17", status: "active" },
    { id: 3, username: "player005", currentVip: "Diamond", totalDeposit: 100000, totalBets: 300000, lastActivity: "2024-01-18", status: "active" },
    { id: 4, username: "player007", currentVip: "Gold", totalDeposit: 25000, totalBets: 75000, lastActivity: "2024-01-16", status: "active" },
  ];

  const vipTiers = [
    { 
      level: "Bronze", 
      minDeposit: 0, 
      minBets: 0, 
      benefits: "Basic support, 1% cashback",
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
    },
    { 
      level: "Silver", 
      minDeposit: 1000, 
      minBets: 5000, 
      benefits: "Priority support, 2% cashback, weekly bonus",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    },
    { 
      level: "Gold", 
      minDeposit: 5000, 
      minBets: 20000, 
      benefits: "VIP support, 3% cashback, daily bonus, exclusive games",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    },
    { 
      level: "Platinum", 
      minDeposit: 25000, 
      minBets: 100000, 
      benefits: "Dedicated manager, 5% cashback, custom bonuses",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    },
    { 
      level: "Diamond", 
      minDeposit: 100000, 
      minBets: 500000, 
      benefits: "Personal account manager, 7% cashback, exclusive events",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    },
  ];

  const handleAdjustVip = (user) => {
    setSelectedUser(user);
    setNewVipLevel(user.currentVip);
    setShowAdjustModal(true);
  };

  const handleSaveVipAdjustment = () => {
    // TODO: API call
    toast.success(`VIP level for ${selectedUser.username} changed from ${selectedUser.currentVip} to ${newVipLevel}`);
    setShowAdjustModal(false);
    setSelectedUser(null);
    setNewVipLevel("");
  };

  const getVipBadge = (vip) => {
    const tier = vipTiers.find(t => t.level === vip);
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${tier?.color || 'bg-gray-100 text-gray-800'}`}>{vip}</span>;
  };

  const filteredUsers = vipUsers.filter(user => 
    !searchTerm || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.currentVip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">VIP & Segmentation</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Configure VIP tiers, view high-value players, and manually adjust VIP levels.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { id: "users", label: "High-Value Users" },
              { id: "config", label: "VIP Configuration" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
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

        <div className="p-6">
          {/* High-Value Users Tab */}
          {activeTab === "users" && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by username or VIP level..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">VIP Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total Deposit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total Bets</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Last Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getVipBadge(user.currentVip)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${user.totalDeposit.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${user.totalBets.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.lastActivity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                          <ActionsMenu
                            isOpen={openMenu === `vip-${user.id}`}
                            onToggle={() => setOpenMenu(openMenu === `vip-${user.id}` ? null : `vip-${user.id}`)}
                            showIcons={false}
                            actions={[
                              { 
                                label: "Adjust VIP", 
                                onClick: () => handleAdjustVip(user)
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* VIP Configuration Tab */}
          {activeTab === "config" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">VIP Tier Configuration</h3>
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Edit Configuration
                </button>
              </div>

              <div className="grid gap-4">
                {vipTiers.map((tier) => (
                  <div key={tier.level} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getVipBadge(tier.level)}
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{tier.level}</h4>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Minimum Deposit</p>
                        <p className="font-medium text-gray-900 dark:text-white">${tier.minDeposit.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Minimum Bets</p>
                        <p className="font-medium text-gray-900 dark:text-white">${tier.minBets.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Benefits</p>
                        <p className="font-medium text-gray-900 dark:text-white">{tier.benefits}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIP Adjustment Modal */}
      {showAdjustModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Adjust VIP Level</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">User: <strong>{selectedUser.username}</strong></p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current VIP: {getVipBadge(selectedUser.currentVip)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New VIP Level</label>
                <select
                  value={newVipLevel}
                  onChange={(e) => setNewVipLevel(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {vipTiers.map((tier) => (
                    <option key={tier.level} value={tier.level}>{tier.level}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAdjustModal(false);
                  setSelectedUser(null);
                  setNewVipLevel("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVipAdjustment}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit VIP Configuration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This would open a detailed configuration interface for editing VIP tier requirements and benefits.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}