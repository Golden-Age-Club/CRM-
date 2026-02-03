import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ActionsMenu from "../components/ActionsMenu";
import api from "../api/axios";
import { toast } from "react-toastify";
import { FaUserPlus, FaSearch, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    vip_level: 0,
    risk_level: "low",
    balance: 0
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/admin/users', formData);
      toast.success(t('users_page.success_create', "User created successfully"));
      onUserAdded();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || t('users_page.failed_create', "Failed to create user"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('users_page.add_new_user', 'Add New User')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.first_name', 'First Name')}</label>
              <input name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.last_name', 'Last Name')}</label>
              <input name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.username', 'Username')} *</label>
            <input required name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.email', 'Email')}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.password', 'Password')}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.vip_level', 'VIP Level')}</label>
              <input type="number" name="vip_level" value={formData.vip_level} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.risk_level', 'Risk Level')}</label>
              <select name="risk_level" value={formData.risk_level} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border">
                <option value="low">{t('users_page.low', 'Low')}</option>
                <option value="medium">{t('users_page.medium', 'Medium')}</option>
                <option value="high">{t('users_page.high', 'High')}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users_page.initial_balance', 'Initial Balance')}</label>
            <input type="number" name="balance" value={formData.balance} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 border" />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">{t('users_page.cancel', 'Cancel')}</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50">
              {loading ? t('users_page.creating', 'Creating...') : t('users_page.create_user', 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function UsersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, vip: 0, frozen: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(1, searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = async (pageNum = 1, search = "") => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/users?page=${pageNum}&limit=10&search=${search}`);
      setUsers(response.users);
      setTotalPages(response.pages);
      setPage(response.page);
      
      // Also fetch stats if first page or search changed (optional, could be separate)
      fetchStats();
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error(t('users_page.failed_load', "Failed to load users"));
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/admin/users/stats');
      setStats(response);
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchUsers(newPage, searchTerm);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm(t('users_page.confirm_delete', "Are you sure you want to delete this user?"))) {
      try {
        await api.delete(`/api/admin/users/${userId}`);
        toast.success(t('users_page.success_delete', "User deleted successfully"));
        fetchUsers(page, searchTerm);
      } catch (error) {
        toast.error(t('users_page.failed_delete', "Failed to delete user"));
      }
    }
  };

  const handleFreezeToggle = async (user) => {
    const newFrozenStatus = !user.is_frozen;
    const actionKey = newFrozenStatus ? "freeze" : "unfreeze";
    const actionText = t(`users_page.${actionKey}`);
    
    if (window.confirm(t('users_page.confirm_action', { action: actionText, defaultValue: `Are you sure you want to ${actionKey} this user?` }))) {
      try {
        await api.put(`/api/admin/users/${user._id}`, { 
          is_frozen: newFrozenStatus,
          is_active: !newFrozenStatus // Assuming freeze implies inactive
        });
        toast.success(t('users_page.success_action', { action: actionText, defaultValue: `User ${actionKey}d successfully` }));
        fetchUsers(page, searchTerm);
      } catch (error) {
        toast.error(t('users_page.failed_action', { action: actionText, defaultValue: `Failed to ${actionKey} user` }));
      }
    }
  };

  const statCards = [
    { label: t('users_page.total_users', "Total Users"), value: stats.total, color: "bg-blue-50 text-blue-600", icon: "👥" },
    { label: t('users_page.active_users', "Active Users"), value: stats.active, color: "bg-green-50 text-green-600", icon: "✅" },
    { label: t('users_page.vip_users', "VIP Users"), value: stats.vip, color: "bg-purple-50 text-purple-600", icon: "👑" },
    { label: t('users_page.frozen_users', "Frozen Users"), value: stats.frozen, color: "bg-red-50 text-red-600", icon: "❄️" },
  ];

  const getRiskBadge = (level) => {
    const colors = {
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[level] || colors.low}`}>{level.toUpperCase()}</span>;
  };

  const getStatusBadge = (user) => {
    if (user.is_frozen) {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{t('users_page.status.frozen')}</span>;
    }
    return user.is_active ? (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{t('users_page.status.active')}</span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{t('users_page.status.inactive')}</span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('users_page.title')}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t('users_page.subtitle')}
          </p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
          <FaUserPlus className="mr-2" /> {t('users_page.add_user_btn')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-xl`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-visible">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.user_col')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.vip_level')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.risk_level')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.status_col')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.balance_col')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.joined_col')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('users_page.actions_col')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">{t('users_page.loading')}</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">{t('users_page.no_users')}</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium uppercase">
                          {user.username?.[0] || user.email?.[0] || "?"}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            @{user.username || "no-username"}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">VIP {user.vip_level}</td>
                    <td className="px-6 py-4">{getRiskBadge(user.risk_level)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${user.balance?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 relative">
                      <ActionsMenu
                        isOpen={openMenu === user._id}
                        onToggle={() => setOpenMenu(openMenu === user._id ? null : user._id)}
                        actions={[
                          { label: t('users_page.view_details'), icon: "view", onClick: () => navigate(`/users/${user._id}`) },
                          { label: t('users_page.edit_user'), icon: "edit", onClick: () => navigate(`/users/${user._id}`) }, // Same page for now as requested
                          { 
                            label: user.is_frozen ? t('users_page.unfreeze_user') : t('users_page.freeze_user'), 
                            icon: "block", 
                            onClick: () => handleFreezeToggle(user),
                            danger: !user.is_frozen 
                          },
                          { label: t('users_page.delete_user'), icon: "delete", onClick: () => handleDelete(user._id), danger: true },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('users_page.showing_page', { page, totalPages })}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
            >
              {t('users_page.previous')}
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
            >
              {t('users_page.next')}
            </button>
          </div>
        </div>
      </div>

      <AddUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onUserAdded={() => fetchUsers(page, searchTerm)} 
      />
    </div>
  );
}