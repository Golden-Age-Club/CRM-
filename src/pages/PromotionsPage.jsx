import React, { useState } from "react";
import { toast } from 'react-toastify';
import ActionsMenu from "../components/ActionsMenu";

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState("promotions");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    type: "deposit_bonus",
    description: "",
    bonusAmount: "",
    minDeposit: "",
    wagering: "",
    validFrom: "",
    validTo: "",
    status: "active"
  });

  // Mock data
  const promotions = [
    {
      id: 1,
      name: "Welcome Bonus",
      type: "deposit_bonus",
      description: "100% match bonus up to $500 for new players",
      bonusAmount: 100,
      minDeposit: 20,
      wagering: 35,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      status: "active",
      totalClaimed: 1250,
      totalValue: 125000
    },
    {
      id: 2,
      name: "Free Spins Friday",
      type: "free_spins",
      description: "50 free spins on selected slots every Friday",
      bonusAmount: 50,
      minDeposit: 0,
      wagering: 25,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      status: "active",
      totalClaimed: 3200,
      totalValue: 16000
    },
    {
      id: 3,
      name: "VIP Cashback",
      type: "cashback",
      description: "5% cashback for VIP players",
      bonusAmount: 5,
      minDeposit: 100,
      wagering: 1,
      validFrom: "2024-01-01",
      validTo: "2024-06-30",
      status: "disabled",
      totalClaimed: 450,
      totalValue: 22500
    },
  ];

  const userBonuses = [
    {
      id: 1,
      userId: 1,
      username: "player001",
      promotionName: "Welcome Bonus",
      bonusAmount: 500,
      wageringRequired: 17500,
      wageringCompleted: 8250,
      status: "active",
      claimedDate: "2024-01-15",
      expiryDate: "2024-02-15"
    },
    {
      id: 2,
      userId: 3,
      username: "player003",
      promotionName: "Free Spins Friday",
      bonusAmount: 50,
      wageringRequired: 1250,
      wageringCompleted: 1250,
      status: "completed",
      claimedDate: "2024-01-12",
      expiryDate: "2024-01-19"
    },
    {
      id: 3,
      userId: 2,
      username: "player002",
      promotionName: "VIP Cashback",
      bonusAmount: 125,
      wageringRequired: 125,
      wageringCompleted: 0,
      status: "expired",
      claimedDate: "2024-01-10",
      expiryDate: "2024-01-17"
    },
  ];

  const handleCreatePromotion = () => {
    // TODO: API call
    toast.success(`Promotion "${newPromotion.name}" created successfully`);
    setShowCreateModal(false);
    setNewPromotion({
      name: "",
      type: "deposit_bonus",
      description: "",
      bonusAmount: "",
      minDeposit: "",
      wagering: "",
      validFrom: "",
      validTo: "",
      status: "active"
    });
  };

  const handleTogglePromotion = (id, currentStatus) => {
    // Update promotion status in state
    const updatedPromotions = promotions.map(promo => 
      promo.id === id 
        ? { ...promo, status: currentStatus === "active" ? "disabled" : "active" }
        : promo
    );
    setPromotions(updatedPromotions);
    
    // TODO: API call
    toast.success(`Promotion ${id} ${currentStatus === "active" ? "disabled" : "enabled"}`);
  };

  const handleEditPromotion = (promotion) => {
    setSelectedPromotion(promotion);
    setShowEditModal(true);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      disabled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      expired: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>{status}</span>;
  };

  const getTypeBadge = (type) => {
    const colors = {
      deposit_bonus: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      free_spins: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      cashback: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      no_deposit: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    const labels = {
      deposit_bonus: "Deposit Bonus",
      free_spins: "Free Spins",
      cashback: "Cashback",
      no_deposit: "No Deposit",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[type]}`}>{labels[type]}</span>;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Bonus & Promotions</h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create, edit, and manage promotions. Configure bonus rules and view user bonus status.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto -mb-px">
            {[
              { id: "promotions", label: "Promotions" },
              { id: "user_bonuses", label: "User Bonuses" },
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
          {/* Header with Search and Create Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <input
              type="text"
              placeholder={
                activeTab === "promotions" ? "Search promotions..." : "Search by username or promotion..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            {activeTab === "promotions" && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-xs sm:text-sm w-full sm:w-auto"
              >
                Create Promotion
              </button>
            )}
          </div>

          {/* Promotions Tab */}
          {activeTab === "promotions" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Bonus</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Min</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Wager</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Claimed</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {promotions.map((promo) => (
                    <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{promo.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[100px]">{promo.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getTypeBadge(promo.type)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                        {promo.type === "free_spins" ? `${promo.bonusAmount} spins` :
                         promo.type === "cashback" ? `${promo.bonusAmount}%` :
                         `${promo.bonusAmount}%`}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">${promo.minDeposit}</td>
                      <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{promo.wagering}x</td>
                      <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(promo.status)}</td>
                      <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{promo.totalClaimed}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm relative">
                        <ActionsMenu
                          isOpen={openMenu === `promo-${promo.id}`}
                          onToggle={() => setOpenMenu(openMenu === `promo-${promo.id}` ? null : `promo-${promo.id}`)}
                          showIcons={false}
                          actions={[
                            {
                              label: "Edit",
                              onClick: () => handleEditPromotion(promo)
                            },
                            {
                              label: promo.status === "active" ? "Disable" : "Enable",
                              onClick: () => handleTogglePromotion(promo.id, promo.status),
                              danger: promo.status === "active"
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

          {/* User Bonuses Tab */}
          {activeTab === "user_bonuses" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">User</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Promotion</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Bonus</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Wagering</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                    <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Expiry</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {userBonuses.map((bonus) => (
                    <tr key={bonus.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">{bonus.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{bonus.username}</td>
                      <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white truncate max-w-[120px]">{bonus.promotionName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">${bonus.bonusAmount}</td>
                      <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                            <div
                              className="bg-orange-500 h-1.5 sm:h-2 rounded-full"
                              style={{ width: `${Math.min((bonus.wageringCompleted / bonus.wageringRequired) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs hidden sm:inline">
                            ${bonus.wageringCompleted.toLocaleString()} / ${bonus.wageringRequired.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(bonus.status)}</td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">{bonus.expiryDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Promotion Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Promotion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={newPromotion.name}
                  onChange={(e) => setNewPromotion({...newPromotion, name: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  value={newPromotion.type}
                  onChange={(e) => setNewPromotion({...newPromotion, type: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="deposit_bonus">Deposit Bonus</option>
                  <option value="free_spins">Free Spins</option>
                  <option value="cashback">Cashback</option>
                  <option value="no_deposit">No Deposit</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bonus Amount</label>
                <input
                  type="number"
                  value={newPromotion.bonusAmount}
                  onChange={(e) => setNewPromotion({...newPromotion, bonusAmount: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Deposit</label>
                <input
                  type="number"
                  value={newPromotion.minDeposit}
                  onChange={(e) => setNewPromotion({...newPromotion, minDeposit: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wagering Requirement</label>
                <input
                  type="number"
                  value={newPromotion.wagering}
                  onChange={(e) => setNewPromotion({...newPromotion, wagering: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valid From</label>
                <input
                  type="date"
                  value={newPromotion.validFrom}
                  onChange={(e) => setNewPromotion({...newPromotion, validFrom: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valid To</label>
                <input
                  type="date"
                  value={newPromotion.validTo}
                  onChange={(e) => setNewPromotion({...newPromotion, validTo: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePromotion}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
              >
                Create Promotion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Promotion Modal */}
      {showEditModal && selectedPromotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-2xl">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Promotion</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Editing: <strong>{selectedPromotion.name}</strong>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              This would open a detailed form for editing the promotion configuration.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedPromotion(null);
                }}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
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