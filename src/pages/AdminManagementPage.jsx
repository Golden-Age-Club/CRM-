import React, { useState } from "react";
import { toast } from 'react-toastify';
import ActionsMenu from "../components/ActionsMenu";

export default function AdminManagementPage() {
  const [activeTab, setActiveTab] = useState("admins");
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    role: "operator",
    status: "active"
  });

  // State for admin accounts
  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      username: "admin_super", 
      email: "super@goldencash.com", 
      role: "super_admin", 
      status: "active", 
      lastLogin: "2024-01-18 10:30",
      createdAt: "2023-12-01"
    },
    { 
      id: 2, 
      username: "admin_finance", 
      email: "finance@goldencash.com", 
      role: "finance", 
      status: "active", 
      lastLogin: "2024-01-18 09:15",
      createdAt: "2023-12-05"
    },
    { 
      id: 3, 
      username: "admin_risk", 
      email: "risk@goldencash.com", 
      role: "risk", 
      status: "active", 
      lastLogin: "2024-01-17 16:45",
      createdAt: "2023-12-10"
    },
    { 
      id: 4, 
      username: "admin_ops", 
      email: "ops@goldencash.com", 
      role: "operator", 
      status: "inactive", 
      lastLogin: "2024-01-15 14:20",
      createdAt: "2023-12-15"
    },
    { 
      id: 5, 
      username: "admin_support", 
      email: "support@goldencash.com", 
      role: "customer_support", 
      status: "active", 
      lastLogin: "2024-01-18 11:30",
      createdAt: "2023-12-20"
    },
  ]);

  const roles = [
    { id: "super_admin", name: "Super Admin", description: "Full system access" },
    { id: "operator", name: "Operator", description: "User and game management" },
    { id: "finance", name: "Finance", description: "Wallet and transaction management" },
    { id: "risk", name: "Risk Control", description: "Risk monitoring and control" },
    { id: "customer_support", name: "Customer Support", description: "Player support and communication" }
  ];

  const handleCreateAdmin = () => {
    // TODO: API call to create admin
    toast.success(`Admin "${newAdmin.username}" created with role: ${newAdmin.role}`);
    
    // Add the new admin to the list
    const newAdminObj = {
      id: admins.length + 1,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      status: newAdmin.status,
      lastLogin: "Just created",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setAdmins([...admins, newAdminObj]);
    
    setShowCreateModal(false);
    setNewAdmin({
      username: "",
      email: "",
      role: "operator",
      status: "active"
    });
  };

  const handleUpdateAdmin = () => {
    // Update the admin in the state
    const updatedAdmins = admins.map(admin => 
      admin.id === selectedAdmin.id ? {...selectedAdmin} : admin
    );
    setAdmins(updatedAdmins);
    
    // TODO: API call to update admin
    toast.success(`Admin "${selectedAdmin.username}" updated`);
    
    setShowEditModal(false);
    setSelectedAdmin(null);
  };

  const handleToggleStatus = (adminId, currentStatus) => {
    // Update the admin status in state
    const updatedAdmins = admins.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: currentStatus === "active" ? "inactive" : "active" }
        : admin
    );
    setAdmins(updatedAdmins);
    
    // TODO: API call to toggle status
    toast.success(`Admin ${adminId} ${currentStatus === "active" ? "deactivated" : "activated"}`);
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin({...admin}); // Create a copy to avoid direct mutation
    setShowEditModal(true);
  };

  const getStatusBadge = (status) => {
    return status === "active" 
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Inactive</span>;
  };

  const getRoleBadge = (role) => {
    const roleConfig = roles.find(r => r.id === role);
    const colors = {
      super_admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      operator: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      finance: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      risk: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      customer_support: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[role] || 'bg-gray-100 text-gray-800'}`}>
        {roleConfig?.name || role}
      </span>
    );
  };

  const filteredAdmins = admins.filter(admin => 
    !searchTerm || 
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Admin Management</h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create and manage admin accounts with role-based permissions.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto -mb-px">
            {[
              { id: "admins", label: "Admin Accounts" },
              { id: "roles", label: "Role Permissions" },
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
          {/* Admin Accounts Tab */}
          {activeTab === "admins" && (
            <>
              {/* Header with Search and Create Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Search by username, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center text-xs sm:text-sm w-full sm:w-auto"
                >
                  <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Admin
                </button>
              </div>

              {/* Admins Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Username</th>
                      <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Role</th>
                      <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                      <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Last Login</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {admin.username}
                        </td>
                        <td className="hidden lg:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                          {admin.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getRoleBadge(admin.role)}
                        </td>
                        <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(admin.status)}
                        </td>
                        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {admin.lastLogin}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm relative">
                          <ActionsMenu
                            isOpen={openMenu === admin.id}
                            onToggle={() => setOpenMenu(openMenu === admin.id ? null : admin.id)}
                            showIcons={false}
                            actions={[
                              { label: "Edit", onClick: () => handleEditAdmin(admin) },
                              {
                                label: admin.status === "active" ? "Deactivate" : "Activate",
                                onClick: () => handleToggleStatus(admin.id, admin.status),
                                danger: admin.status === "active"
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

          {/* Role Permissions Tab */}
          {activeTab === "roles" && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">Role Permissions Overview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Each role has specific access permissions to system modules.
                </p>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 sm:mb-3">
                      <div>
                        <h4 className="text-sm sm:text-lg font-medium text-gray-900 dark:text-white">{role.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                      </div>
                      {getRoleBadge(role.id)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <p><strong>Permissions:</strong>
                        {role.id === "super_admin" && " Full access to all modules"}
                        {role.id === "operator" && " Users, Bets, Games, VIP, Promotions"}
                        {role.id === "finance" && " Finance, Wallet, Transactions"}
                        {role.id === "risk" && " Risk Control, User Restrictions, Monitoring"}
                        {role.id === "customer_support" && " User Management, Communications"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Create New Admin</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAdmin}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
              >
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Edit Admin</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={selectedAdmin.username}
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={selectedAdmin.email}
                  onChange={(e) => setSelectedAdmin({...selectedAdmin, email: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={selectedAdmin.role}
                  onChange={(e) => setSelectedAdmin({...selectedAdmin, role: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={selectedAdmin.status}
                  onChange={(e) => setSelectedAdmin({...selectedAdmin, status: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateAdmin}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
              >
                Update Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}