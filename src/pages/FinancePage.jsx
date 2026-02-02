import React, { useState } from "react";
import { toast } from 'react-toastify';
import ActionsMenu from "../components/ActionsMenu";

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("balances");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustUserId, setAdjustUserId] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustReason, setAdjustReason] = useState("");
  const [confirmAdjust, setConfirmAdjust] = useState(false);

  // Mock data
  const balances = [
    { userId: 1, username: "player001", available: 1250.50, frozen: 0, total: 1250.50 },
    { userId: 2, username: "player002", available: 0, frozen: 850.00, total: 850.00 },
    { userId: 3, username: "player003", available: 5420.75, frozen: 0, total: 5420.75 },
  ];

  const deposits = [
    { id: "DEP001", userId: 1, username: "player001", amount: 500.00, status: "completed", date: "2024-01-15 10:30", method: "Credit Card" },
    { id: "DEP002", userId: 2, username: "player002", amount: 200.00, status: "pending", date: "2024-01-16 14:20", method: "Bank Transfer" },
    { id: "DEP003", userId: 3, username: "player003", amount: 1000.00, status: "completed", date: "2024-01-17 09:15", method: "Crypto" },
  ];

  const withdrawals = [
    { id: "WD001", userId: 1, username: "player001", amount: 300.00, status: "pending", date: "2024-01-18 11:00", reason: "Personal use" },
    { id: "WD002", userId: 3, username: "player003", amount: 500.00, status: "approved", date: "2024-01-17 16:45", reason: "Withdrawal request" },
    { id: "WD003", userId: 2, username: "player002", amount: 100.00, status: "rejected", date: "2024-01-16 13:20", reason: "Insufficient balance" },
  ];

  const handleWithdrawalAction = (id, action) => {
    // Update withdrawal status in state
    const updatedWithdrawals = withdrawals.map(wd => 
      wd.id === id 
        ? { ...wd, status: action === "approved" ? "approved" : "rejected" }
        : wd
    );
    setWithdrawals(updatedWithdrawals);
    
    // TODO: API call
    toast.success(`Withdrawal ${id} ${action}`);
  };

  const handleAdjustBalance = () => {
    if (!confirmAdjust) {
      setConfirmAdjust(true);
      return;
    }
    // TODO: API call with double confirmation
    toast.success(`Balance adjusted for user ${adjustUserId}: $${adjustAmount} - Reason: ${adjustReason}`);
    setShowAdjustModal(false);
    setConfirmAdjust(false);
    setAdjustAmount("");
    setAdjustReason("");
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Wallet & Finance</h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage user balances, deposits, withdrawals, and manual adjustments.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto -mb-px">
            {[
              { id: "balances", label: "User Balances" },
              { id: "deposits", label: "Deposit Orders" },
              { id: "withdrawals", label: "Withdrawal Requests" },
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
              placeholder="Search by user ID or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Balances Tab */}
          {activeTab === "balances" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Available</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Frozen</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {balances.map((bal) => (
                    <tr key={bal.userId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bal.userId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{bal.username}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">${bal.available.toLocaleString()}</td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">${bal.frozen.toLocaleString()}</td>
                      <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${bal.total.toLocaleString()}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm relative">
                        <ActionsMenu
                          isOpen={openMenu === `bal-${bal.userId}`}
                          onToggle={() => setOpenMenu(openMenu === `bal-${bal.userId}` ? null : `bal-${bal.userId}`)}
                          showIcons={false}
                          actions={[
                            {
                              label: "Adjust Balance",
                              onClick: () => {
                                setAdjustUserId(bal.userId);
                                setShowAdjustModal(true);
                              }
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

          {/* Deposits Tab */}
          {activeTab === "deposits" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Amount</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {deposits.map((dep) => (
                    <tr key={dep.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{dep.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{dep.username}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${dep.amount.toLocaleString()}</td>
                      <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{dep.method}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(dep.status)}</td>
                      <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{dep.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Withdrawals Tab */}
          {activeTab === "withdrawals" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Request ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {withdrawals
                    .filter((wd) => wd.status === "pending")
                    .map((wd) => (
                      <tr key={wd.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{wd.id}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{wd.username}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${wd.amount.toLocaleString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(wd.status)}</td>
                        <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{wd.date}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm relative">
                          <ActionsMenu
                            isOpen={openMenu === `wd-${wd.id}`}
                            onToggle={() => setOpenMenu(openMenu === `wd-${wd.id}` ? null : `wd-${wd.id}`)}
                            showIcons={false}
                            actions={[
                              {
                                label: "Approve",
                                onClick: () => handleWithdrawalAction(wd.id, "approved")
                              },
                              {
                                label: "Reject",
                                onClick: () => handleWithdrawalAction(wd.id, "rejected"),
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
        </div>
      </div>

      {/* Manual Balance Adjustment Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
              {confirmAdjust ? "Confirm Balance Adjustment" : "Manual Balance Adjustment"}
            </h2>
            {!confirmAdjust ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID</label>
                    <input
                      type="text"
                      value={adjustUserId || ""}
                      onChange={(e) => setAdjustUserId(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                    <input
                      type="number"
                      value={adjustAmount}
                      onChange={(e) => setAdjustAmount(e.target.value)}
                      placeholder="Enter amount (positive or negative)"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason (Required)</label>
                    <textarea
                      value={adjustReason}
                      onChange={(e) => setAdjustReason(e.target.value)}
                      placeholder="Enter reason for adjustment..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowAdjustModal(false);
                      setAdjustAmount("");
                      setAdjustReason("");
                    }}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdjustBalance}
                    disabled={!adjustAmount || !adjustReason}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>User ID:</strong> {adjustUserId}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Amount:</strong> ${adjustAmount}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Reason:</strong> {adjustReason}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Please confirm this adjustment. This action will be logged.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setConfirmAdjust(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAdjustBalance}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
                  >
                    Confirm Adjustment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
